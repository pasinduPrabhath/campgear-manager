
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { equipments } from "@/data/equipments";
import { OrderItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CartItem extends OrderItem {
  startDate: string;
  endDate: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (equipmentId: string, quantity: number, startDate: string, endDate: string) => void;
  removeFromCart: (equipmentId: string) => void;
  updateQuantity: (equipmentId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Calculate total amount
  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Calculate item count
  const itemCount = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (equipmentId: string, quantity: number, startDate: string, endDate: string) => {
    const equipment = equipments.find((e) => e.id === equipmentId);
    
    if (!equipment) {
      console.error(`Equipment with id ${equipmentId} not found`);
      return;
    }

    // Check if there's enough stock
    if (equipment.stock < quantity) {
      toast({
        title: "Not enough stock",
        description: `Only ${equipment.stock} units available.`,
        variant: "destructive",
      });
      return;
    }

    // Check if item already in cart
    const existingItemIndex = items.findIndex((item) => item.equipmentId === equipmentId);

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
        startDate,
        endDate,
      };
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([
        ...items,
        {
          equipmentId,
          name: equipment.name,
          quantity,
          price: equipment.price,
          startDate,
          endDate,
        },
      ]);
    }

    toast({
      title: "Added to cart",
      description: `${quantity} x ${equipment.name} added to your cart.`,
    });
  };

  const removeFromCart = (equipmentId: string) => {
    setItems(items.filter((item) => item.equipmentId !== equipmentId));
  };

  const updateQuantity = (equipmentId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(equipmentId);
      return;
    }

    // Check if there's enough stock
    const equipment = equipments.find((e) => e.id === equipmentId);
    if (!equipment || equipment.stock < quantity) {
      toast({
        title: "Not enough stock",
        description: `Only ${equipment?.stock} units available.`,
        variant: "destructive",
      });
      return;
    }

    setItems(
      items.map((item) =>
        item.equipmentId === equipmentId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
