
import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "555-123-4567",
    items: [
      {
        equipmentId: "1",
        name: "4-Person Camping Tent",
        quantity: 1,
        price: 25
      },
      {
        equipmentId: "4",
        name: "LED Camping Torch",
        quantity: 2,
        price: 5
      }
    ],
    totalAmount: 35,
    paymentSlipUrl: "/payment-slip1.jpg",
    status: "confirmed",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    createdAt: "2023-07-10T08:30:00Z"
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "555-987-6543",
    items: [
      {
        equipmentId: "3",
        name: "Parachute Hammock",
        quantity: 1,
        price: 12
      },
      {
        equipmentId: "5",
        name: "20000mAh Power Bank",
        quantity: 1,
        price: 8
      }
    ],
    totalAmount: 20,
    paymentSlipUrl: "/payment-slip2.jpg",
    status: "pending",
    startDate: "2023-07-22",
    endDate: "2023-07-25",
    createdAt: "2023-07-18T14:45:00Z"
  }
];
