import React, { useEffect, useRef, useState } from "react";
import {
  CircleUser,
  Hamburger,
  Heart,
  Search,
  ShoppingCartIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosinstance";
import { useAuth } from "@/hooks/useAuth";
// import Image from "next/image"; // Uncomment if using <Image />

const Navbar = () => {
  const router = useRouter();
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    pathname === path
      ? "border-b-2 border-blue-500 text-blue-500"
      : "border-b-2 border-transparent";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="mx-auto w-[1580px] flex gap-6 text-lg justify-between">
      <div className="flex items-center gap-2">
        <Hamburger className="laptop:hidden" />
        <h1 className="font-bold cursor-pointer">Exclusive</h1>
      </div>

      <div className="hidden laptop:flex items-center gap-10">
        {[
          { label: "Home", path: "/" },
          { label: "Products", path: "/products" },
          { label: "About", path: "/about" },
          { label: "Contact", path: "/contact" },
        ].map(({ label, path }) => (
          <h1
            key={path}
            onClick={() => router.push(path)}
            className={`cursor-pointer pb-1 transition-all duration-300 ease-in-out ${isActive(
              path
            )}`}
          >
            {label}
          </h1>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden laptop:flex items-center gap-6 relative">
          <input
            type="text"
            placeholder="Search ..."
            className="border-2 h-8 border-neutral-300 hover:border-neutral-600 active:border-neutral-600 py-2 px-4 pr-10 rounded-lg"
          />
          <Search size={16} className="absolute right-27 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          <Heart onClick={() => router.push('/wishlists')} className="cursor-pointer" size={22} />
          <ShoppingCartIcon size={22} onClick={() => router.push("/cart")} className="cursor-pointer" />
        </div>

        <div
          ref={dropdownRef}
          onClick={() => setModalOpen(!modalOpen)}
          className="cursor-pointer w-6 h-6 relative"
        >
          {user ? (
            <img src="/xboxLogo.png" className="rounded-full object-cover" />
          ) : (
            // Or use next/image if you prefer:
            // <Image src="/xboxLogo.png" alt="Avatar" width={28} height={28} className="rounded-full object-cover" />
            <CircleUser />
          )}

          {modalOpen && (
            <div className="absolute z-50 top-9 right-0 text-neutral-800 bg-neutral-50 shadow-xl border rounded-md py-2 flex items-center justify-center">
              {user ? (
                <div className="flex flex-col min-w-[150px] items-center gap-1">
                  <div>Hi, {user.name}</div>
                  <span onClick={()=>router.push('/my-orders')}>My Order</span>
                  <button onClick={handleLogout} className="cursor-pointer hover:text-neutral-300" >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <span className="hover:bg-neutral-200 px-4 py-2 rounded" onClick={() => router.push("/auth/register")}>
                    Register
                  </span>
                  <span className="hover:bg-neutral-200 px-4 py-2 rounded" onClick={() => router.push("/auth/login")}>Login</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
