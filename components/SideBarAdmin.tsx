"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Users,
  Package,
  FolderOpen,
  ShoppingCart,
  LogOut,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  name: string;
}

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User", icon: Users },
    { id: "products", label: "Product", icon: Package },
    { id: "categories", label: "Category", icon: FolderOpen },
    { id: "orders", label: "Order", icon: ShoppingCart },
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="w-64 bg-primary-800 text-white min-h-screen flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-secondary-400" />
            Vortexis
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname.includes(item.id);

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

      {/* Logout */}
      {user && (
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left text-red-500 hover:bg-primary-700 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
