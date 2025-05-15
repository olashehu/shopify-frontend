"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ProductsTypes } from "@/app/lib/constant";

const ProductDetailsPage = () => {
  const param = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductsTypes | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(
          `https://shopify-commerce-api.onrender.com/products/${param.id}`
        );
        setProduct(res.data.product);
      } catch (error) {
        console.error(`Error response ${error}`);
      }
    };
    fetchProductDetails();
  }, [param.id]);

  console.log(product, 'state product');

  return (
    <div>
      <h2>product details page</h2>
    </div>
  );
};
export default ProductDetailsPage;
