
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { orders } from "@/data/orders";
import { equipments } from "@/data/equipments";
import OrderManagement from "@/components/OrderManagement";
import InventoryManagement from "@/components/InventoryManagement";
import { 
  Package, 
  ShoppingCart, 
  DollarSign,
  Users 
} from "lucide-react";

const Admin = () => {
  const orderCount = orders.length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const totalInventory = equipments.reduce((acc, item) => acc + item.stock, 0);
  const lowStockItems = equipments.filter(item => item.stock <= 5).length;
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">{orderCount}</h3>
                <p className="text-xs text-muted-foreground">
                  {pendingOrders} pending
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-green-500/10 p-2 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  From {orderCount} orders
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-blue-500/10 p-2 rounded-full mr-4">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inventory</p>
                <h3 className="text-2xl font-bold">{totalInventory}</h3>
                <p className="text-xs text-muted-foreground">
                  {lowStockItems} low stock items
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-orange-500/10 p-2 rounded-full mr-4">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <h3 className="text-2xl font-bold">
                  {new Set(orders.map(order => order.customerEmail)).size}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Total unique customers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-4">
            <OrderManagement />
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <InventoryManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
