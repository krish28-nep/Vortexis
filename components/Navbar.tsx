import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  CircleUser,
  Hamburger,
  Heart,
  Search,
  ShoppingCartIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface TokenPayload {
  userId: string;
}

const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
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
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(true);
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        console.log("decode",decoded.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setToken(false);
  };
  return (
    <div className="flex mx-8 laptop:mx-36 my-4 gap-6 items-center text-lg justify-between w-full">
      <div className="flex items-center gap-2">
        <Hamburger className="laptop:hidden" />
        <h1 className="font-bold cursor-pointer">Exclusive</h1>
      </div>
      <div className="hidden laptop:flex items-center gap-10">
        {[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
          { label: "About", path: "/about" },
          { label: "Sign Up", path: "/auth/register" },
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
            className="border-2 h-8 border-gray-500 py-2 px-4 pr-10 rounded-lg"
          />
          <Search className="absolute right-27 cursor-pointer" />
          <Heart />
          <ShoppingCartIcon />
        </div>
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
            <div className="absolute z-50 top-9 right-0 text-neutral-100 font-semibold bg-red-400 rounded-lg px-6 py-2 flex items-center justify-center">
              {token ? (
                <div onClick={handleLogout}>Logout</div>
              ) : (
                <div className="flex gap-4">
                  <span onClick={() => router.push("/auth/register")}>
                    Register
                  </span>
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
