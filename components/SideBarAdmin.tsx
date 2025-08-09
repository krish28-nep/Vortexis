"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  FolderOpen,
  ShoppingCart,
  Heart,
  MessageSquare,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "products", label: "Product Management", icon: Package },
    { id: "categories", label: "Category Management", icon: FolderOpen },
    { id: "cart", label: "Cart Management", icon: ShoppingCart },
    { id: "orders", label: "Order Management", icon: Package },
    { id: "wishlist", label: "Wishlist Management", icon: Heart },
    { id: "contact", label: "Contact Management", icon: MessageSquare },
  ];

  const pathname = usePathname(); // current URL path
  const router = useRouter();

  return (
    <div className="w-64 bg-primary-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-secondary-400" />
          Exclusive
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname.includes(item.id); // Check if URL contains menu item id

            return (
              <li key={item.id}>
                <button
                  onClick={() => router.push(`/admin/${item.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? "bg-secondary-600 text-white shadow-lg"
                      : "text-neutral-300 hover:bg-primary-700 hover:text-neutral-500"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
