
import { Button } from "@/components/ui/button";
import { EquipmentCategory } from "@/types";
import { Tent, Lightbulb, Battery, Utensils, CircleEllipsis } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: EquipmentCategory | null;
  onSelectCategory: (category: EquipmentCategory | null) => void;
}

const categories: { label: string; value: EquipmentCategory | null; icon: React.ReactNode }[] = [
  { label: "All", value: null, icon: <CircleEllipsis className="h-4 w-4" /> },
  { label: "Tents", value: "tent", icon: <Tent className="h-4 w-4" /> },
  { label: "Hammocks", value: "hammock", icon: <Tent className="h-4 w-4" /> },
  { label: "Lighting", value: "torch", icon: <Lightbulb className="h-4 w-4" /> },
  { label: "Power Banks", value: "powerBank", icon: <Battery className="h-4 w-4" /> },
  { label: "Cookware", value: "cookware", icon: <Utensils className="h-4 w-4" /> },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.label}
          variant={selectedCategory === category.value ? "default" : "outline"}
          size="sm"
          className="flex gap-1"
          onClick={() => onSelectCategory(category.value)}
        >
          {category.icon}
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
