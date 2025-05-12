"use client";
import React, { useState } from "react";
import Image from "next/image";
import s from "@/public/images/Frame 33.png";
import j from "@/public/images/Frame 34.png";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: "$16.64",
    image: s,
  },
  {
    id: 2,
    name: "Herschel Supply",
    price: "$35.31",
    image: j,
  },
  {
    id: 3,
    name: "Only Check Trouser",
    price: "$25.50",
    image: s,
  },
  {
    id: 4,
    name: "Classic Trench Coat",
    price: "$75.00",
    image: j,
  },
  {
    id: 5,
    name: "Classic Trench Coat",
    price: "$75.00",
    image: s,
  },
  {
    id: 6,
    name: "Classic Trench Coat",
    price: "$75.00",
    image: j,
  },
  {
    id: 7,
    name: "Classic Trench Coat",
    price: "$75.00",
    image: s,
  },
  // Add more items...
];

export default function ProductOverview() {
  const [tab, setTab] = useState(1);

  return (
    <section className="px-4 md:px-12 lg:px-20 py-10 max-w-7xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold">PRODUCT OVERVIEW</h1>

      {/* Filter Nav */}
      <div className="flex items-center justify-between flex-wrap gap-4 py-3">
        <div className="flex gap-4 flex-nowrap text-nowrap text-sm md:text-base font-medium text-muted-foreground overflow-x-scroll no-scrollbar w-1/2 max-w-[600px] border-1.5">
          <button
            onClick={() => setTab(1)}
            className={`${
              tab === 1 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${
              tab === 2 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setTab(3)}
            className={`${
              tab === 3 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setTab(4)}
            className={`${
              tab === 4 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            Bag
          </button>
          <button
            onClick={() => setTab(5)}
            className={`${
              tab === 5 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            Shoes
          </button>
          <button
            onClick={() => setTab(6)}
            className={`${
              tab === 6 &&
              "text-black font-semibold underline underline-offset-4"
            }`}
          >
            Watches
          </button>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" disabled={tab === 1}>
            Prev
          </Button>
          <Button variant="ghost" disabled={tab === 6}>Next</Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="space-y-2 shadow bg-white rounded pb-2"
          >
            <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-medium py-2 pl-3">{product.name}</h3>
            <p className="text-sm text-gray-600 pl-3">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
