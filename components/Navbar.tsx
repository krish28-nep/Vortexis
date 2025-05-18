import React, { useEffect, useRef, useState } from "react";
import { CircleUser, Heart, Search, ShoppingCartIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(!!storedToken);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("token");
    setToken(false);
  };
  return (
    <div className="flex mx-36 my-4 gap-6 items-center text-lg justify-between w-full">
      <h1 className="font-bold cursor-pointer">Exclusive</h1>
      <div className="flex items-center gap-10">
        <h1 onClick={()=>router.push("/")} className="cursor-pointer">Home</h1>
        <h1 className="cursor-pointer">Contact</h1>
        <h1 className="cursor-pointer">About</h1>
        <h1 className="cursor-pointer">Sign Up</h1>
      </div>
      <div className="flex items-center gap-6 relative">
        <input
          type="text"
          className="border-2 h-8 border-gray-500 py-2 px-4 pr-10 rounded-lg"
        />
        <Search className="absolute right-38 cursor-pointer" />
        <Heart />
        <ShoppingCartIcon />
        <div
          ref={dropdownRef}
          onClick={() => setModelOpen(!modelOpen)}
          className="cursor-pointer w-7 h-7 relative"
        >
          {token ? (
            <img src="/xboxLogo.png" className="rounded-full object-cover" />
          ) : (
            <CircleUser />
          )}

          {modelOpen && (
            <div className="absolute z-50 top-10 right-0 text-neutral-100 font-semibold bg-red-400 rounded-lg px-6 py-2 flex items-center justify-center">
              {token ? (
                <div onClick={handleLogout}>Logout</div>
              ) : (
                <div className="flex gap-4">
                  <span onClick={()=> router.push("/auth/register")}>Register</span>
                  <span onClick={() => router.push("/auth/login")}>Login</span>
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
