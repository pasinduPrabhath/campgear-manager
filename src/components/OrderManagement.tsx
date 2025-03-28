
import { useState } from "react";
import { orders } from "@/data/orders";
import { equipments } from "@/data/equipments";
import { Order, OrderStatus } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Eye, Download } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { useToast } from "@/components/ui/use-toast";

const OrderManagement = () => {
  const [ordersList, setOrdersList] = useState<Order[]>(orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList(
      ordersList.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
      </div>

      {/* Orders Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Rental Period</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersList.length > 0 ? (
              ordersList.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {formatDate(order.startDate)} - {formatDate(order.endDate)}
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id} - {formatDate(selectedOrder?.createdAt || "")}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Customer Information
                  </h3>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.customerEmail}</p>
                  <p>{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Rental Period
                  </h3>
                  <p>
                    {formatDate(selectedOrder.startDate)} -{" "}
                    {formatDate(selectedOrder.endDate)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Ordered Items
                </h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.equipmentId}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}/day</TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Payment Slip */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Payment Slip
                </h3>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <span>Payment slip uploaded by customer</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    View Payment Slip
                  </Button>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Order Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedOrder.status === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={selectedOrder.status === "confirmed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateOrderStatus(selectedOrder.id, "confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant={selectedOrder.status === "delivered" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                  >
                    Mark as Delivered
                  </Button>
                  <Button
                    variant={selectedOrder.status === "returned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateOrderStatus(selectedOrder.id, "returned")}
                  >
                    Mark as Returned
                  </Button>
                  <Button
                    variant={selectedOrder.status === "cancelled" ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                  >
                    Cancel Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
