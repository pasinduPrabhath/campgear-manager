
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "outline" | "secondary" | "destructive" }> = {
    pending: { label: "Pending", variant: "outline" },
    confirmed: { label: "Confirmed", variant: "secondary" },
    delivered: { label: "Delivered", variant: "default" },
    returned: { label: "Returned", variant: "default" },
    cancelled: { label: "Cancelled", variant: "destructive" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
