
import { useState } from "react";
import Layout from "@/components/Layout";
import { equipments } from "@/data/equipments";
import EquipmentCard from "@/components/EquipmentCard";
import CategoryFilter from "@/components/CategoryFilter";
import { EquipmentCategory } from "@/types";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Search } from "lucide-react";

const Equipment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as EquipmentCategory | null;
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Filter equipments based on category and search query
  const filteredEquipments = equipments.filter((equipment) => {
    const categoryMatch = selectedCategory ? equipment.category === selectedCategory : true;
    const searchMatch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       equipment.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    setSearchParams(params);
  }, [selectedCategory, searchQuery, setSearchParams]);

  // Handle category selection
  const handleCategorySelect = (category: EquipmentCategory | null) => {
    setSelectedCategory(category);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Camping Equipment</h1>
        
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search equipment..." 
              value={searchQuery} 
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />
        </div>
        
        {/* Results */}
        {filteredEquipments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipments.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No equipment found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Equipment;
