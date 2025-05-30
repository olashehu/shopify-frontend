"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/app/context/cartContext";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import HamburgerIcon from "../icons/HamburgerIcon";
// import SearchIcon from "../icons/SearchIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import ShopifyIcon from "../icons/ShopifyIcon";

const Header = () => {
  const { cartCount, user } = useCart();
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-3 shadow-md sticky top-0 z-50 bg-white">
      {/* Logo */}
      <div className="w-30">
        <Link href="/">
          <ShopifyIcon />
        </Link>
      </div>

      <>
        <div className="hidden md:flex gap-6 items-center text-xl">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </>

      <div className="flex item-center gap-2">
        {/* <Button variant="ghost" className="p-2">
          <SearchIcon />
        </Button> */}
        {user?.username && (
          <div className="flex items-center gap-3">{user.username}</div>
        )}
        <Link href={'/cart'} className="relative p-2">
          <ShoppingCartIcon />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <HamburgerIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 pt-4">
            <div className="flex flex-col gap-3 pt-4 pl-3">
              <SheetClose asChild>
                <Link href="/shop" className="w-fit">
                  Shop
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="w-fit">
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="w-fit">
                  Contact
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Header;
