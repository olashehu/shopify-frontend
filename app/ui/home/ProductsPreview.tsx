"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ProductsTypes } from "@/app/lib/constant";
import AlertDialogModal from "../modal/AlertDialog";
import { baseURL, LIMIT } from "@/app/lib/constant";

export default function ProductsOverview() {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [product, setProduct] = useState<ProductsTypes | null>(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState<null | { category: string }[]>(
    []
  );
  const [pagination, setPagination] = useState<null | {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  }>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        console.log("use effect");
        const catFilter = category == "all" ? "" : category;
        const { data } = await axios.get(
          `${baseURL}/products?page=${page}&category=${catFilter}&limit=${LIMIT}`
        );
        setProducts(data.data);
        setCategories(data.categories);
        setPagination(data.pagination);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category, page]);

  console.log(pagination, "pagstate");

  return (
    <>
      <section className="px-4 md:px-8 lg:px-20 py-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">PRODUCT OVERVIEW</h1>

        {/* Filter Nav */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-3">
          <div className="flex gap-4 flex-nowrap text-nowrap text-sm md:text-base font-medium text-muted-foreground overflow-x-scroll no-scrollbar w-1/2 max-w-[600px] border-1.5">
            <button
              onClick={() => setCategory("all")}
              className={`cursor-pointer ${
                category === "all" &&
                "text-black font-semibold underline underline-offset-4"
              }`}
            >
              All Products
            </button>
            {categories?.map((ca) => (
              <button
                key={ca.category}
                onClick={() => setCategory(ca.category)}
                className={`cursor-pointer ${
                  category === ca.category &&
                  "text-black font-semibold underline underline-offset-4"
                }`}
              >
                {ca.category}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" disabled={page == 1} onClick={() => setPage(page - 1)}>
              Prev
            </Button>
            <Button variant="ghost" onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product: ProductsTypes) => {
            const { images } = product;
            return (
              <div
                className="space-y-2 shadow bg-white rounded pb-2 group"
                key={product.id}
                onClick={() => {
                  setProduct(product);
                  setOpen(true);
                }}
              >
                <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-medium py-2 pl-3">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 pl-3">{product.price}</p>
              </div>
            );
          })}
        </div>
      </section>
      <AlertDialogModal
        openDialog={open}
        onOpenChange={setOpen}
        product={product}
      />
    </>
  );
}
