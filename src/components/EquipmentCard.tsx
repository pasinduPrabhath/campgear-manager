
import { Equipment } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface EquipmentCardProps {
  equipment: Equipment;
}

const EquipmentCard = ({ equipment }: EquipmentCardProps) => {
  const { id, name, description, price, stock, image } = equipment;

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {stock > 0 ? `${stock} Available` : "Out of Stock"}
          </span>
        </div>
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{description}</p>
        <p className="font-medium">${price} / day</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/equipment/${id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Button 
          size="icon" 
          disabled={stock <= 0}
          className="shrink-0"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EquipmentCard;
