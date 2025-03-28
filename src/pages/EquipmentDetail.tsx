
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { equipments } from "@/data/equipments";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/DateRangePicker";

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const equipment = equipments.find((e) => e.id === id);

  const [quantity, setQuantity] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3)
  });

  if (!equipment) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Equipment Not Found</h2>
          <p className="mb-6">Sorry, the requested equipment could not be found.</p>
          <Link to="/equipment">
            <Button>Back to Equipment</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= equipment.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!dateRange?.from || !dateRange?.to) {
      return;
    }

    addToCart(
      equipment.id,
      quantity,
      format(dateRange.from, "yyyy-MM-dd"),
      format(dateRange.to, "yyyy-MM-dd")
    );
    
    navigate("/cart");
  };

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/equipment" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Equipment
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Equipment Image */}
          <div className="bg-muted rounded-lg overflow-hidden">
            <img
              src={equipment.image || "/placeholder.svg"}
              alt={equipment.name}
              className="w-full h-full object-cover aspect-square"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Equipment Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">${equipment.price} / day</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{equipment.description}</p>
            </div>

            <Card className="p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Availability</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  equipment.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {equipment.stock > 0 ? `${equipment.stock} Available` : "Out of Stock"}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Select Rental Dates</h3>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= equipment.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={equipment.stock <= 0 || !dateRange?.from || !dateRange?.to}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </Card>

            <div>
              <h3 className="text-lg font-medium mb-2">Rental Policy</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>ID and security deposit required</li>
                <li>Rental period starts at pickup time</li>
                <li>Late returns will incur additional charges</li>
                <li>Equipment must be returned in the same condition</li>
                <li>Cancellations must be made 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EquipmentDetail;
