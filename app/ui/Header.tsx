"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import HamburgerIcon from "../icons/HamburgerIcon";
import SearchIcon from "../icons/SearchIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import ShopifyIcon from "../icons/ShopifyIcon";

const Header = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products?page=1&limit=190")
      .then((res) => {
        console.log("hello");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }, []);

  console.log(data, "data");

  return (
    <nav className="flex items-center px-4 lg:px-20 py-3 shadow-md sticky top-0 z-50 bg-white">
      {/* Logo */}
      <div className="w-30">
        <Link href="/">
          <ShopifyIcon />
        </Link>
      </div>

      <div className="w-[95%] pl-12 flex items-center justify-between">
        <div>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        {/* icons and mobile nav container */}
        <div className="flex item-center gap-2">
          <Button variant="ghost" className="p-2">
            <SearchIcon />
          </Button>
          <Button variant="ghost" className="p-2">
            <ShoppingCartIcon />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-3 pt-4 pl-3">
                <SheetClose asChild>
                  <Link href="/shop">Shop</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about">About</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact">Contact</Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
