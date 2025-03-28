
import { useState } from "react";
import { equipments } from "@/data/equipments";
import { Equipment, EquipmentCategory } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Plus, 
  Package, 
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const InventoryManagement = () => {
  const [inventoryList, setInventoryList] = useState<Equipment[]>(equipments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<Equipment | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "tent" as EquipmentCategory,
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });
  const { toast } = useToast();

  const categoryOptions: { value: EquipmentCategory; label: string }[] = [
    { value: "tent", label: "Tent" },
    { value: "hammock", label: "Hammock" },
    { value: "torch", label: "Torch" },
    { value: "powerBank", label: "Power Bank" },
    { value: "cookware", label: "Cookware" },
    { value: "sleeping", label: "Sleeping Equipment" },
    { value: "other", label: "Other" },
  ];

  const handleNewItem = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setFormData({
      id: `${inventoryList.length + 1}`,
      name: "",
      category: "tent",
      description: "",
      price: 0,
      stock: 0,
      image: "/placeholder.svg",
    });
    setIsFormOpen(true);
  };

  const handleEditItem = (item: Equipment) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" || name === "stock" ? Number(value) : value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value as EquipmentCategory });
  };

  const handleSubmit = () => {
    if (!formData.name || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isEditMode && currentItem) {
      // Update existing item
      setInventoryList(
        inventoryList.map((item) =>
          item.id === currentItem.id ? formData : item
        )
      );
      toast({
        title: "Equipment updated",
        description: `${formData.name} has been updated`,
      });
    } else {
      // Add new item
      setInventoryList([...inventoryList, formData]);
      toast({
        title: "Equipment added",
        description: `${formData.name} has been added to inventory`,
      });
    }

    setIsFormOpen(false);
  };

  const isLowStock = (stock: number) => stock <= 5;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Inventory</h2>
        <Button onClick={handleNewItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Equipment
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryList.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">
                  {item.category.replace(/([A-Z])/g, " $1")}
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={isLowStock(item.stock) ? "text-orange-500 font-medium" : ""}>
                      {item.stock}
                    </span>
                    {isLowStock(item.stock) && (
                      <AlertTriangle className="h-4 w-4 ml-2 text-orange-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Equipment Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Equipment" : "Add New Equipment"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Equipment Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price per Day ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  min={0}
                  step={0.01}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/image-url.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditMode ? "Update" : "Add"} Equipment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
