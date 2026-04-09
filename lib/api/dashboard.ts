import { axiosInstance } from "../axiosinstance";

export type AdminDashboardResponse = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    user: { name: string; email?: string | null; phoneNumber?: string | null };
    payment: { paymentMethod: string; paymentStatus: string } | null;
  }>;
};

export const fetchAdminDashboard = async () => {
  const { data } = await axiosInstance.get("/dashboard");
  return data.data as AdminDashboardResponse;
};
