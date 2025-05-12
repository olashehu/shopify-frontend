"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleClick(type: string) {
    if (type === "serchicon") {
      console.log("click search icon");
    }
    if (type === "shoppingicon") {
      console.log("click shopping icon");
    }
    if (type === "hamburgericon") {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  }

  return (
    <>
      <nav className="flex items-center bg-transparent px-3 py-4 shadow-md">
        {/* logo container */}
        <div className="w-[20%]">
          <Link href="/">
            <h1 className="text-2xl font-bold">shopify</h1>
          </Link>
        </div>

        {/* desktop links and icons */}
        <div className="flex w-[80%] items-center justify-between">
          {/* nav links */}
          <div className="hidden md:flex gap-6">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* icons container */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-none outline-none bg-transparent cursor-pointer"
              onClick={() => handleClick("serchicon")}
            >
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-none outline-none bg-transparent cursor-pointer"
              onClick={() => handleClick("shoppingicon")}
            >
            </Button>
            {/* hamburger for mobile */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-none outline-none bg-transparent cursor-pointer"
              onClick={() => handleClick("hamburgericon")}
            >
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - slide in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
