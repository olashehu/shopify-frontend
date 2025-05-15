"use client";

import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ProductsTypes } from "@/app/lib/constant";
import CancelIcon from "@/app/icons/CancelIcon";
import ProductSkeleton from "../skeleton/ProductSkeleton";

interface Dialog {
  openDialog: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductsTypes | null;
}

const AlertDialogModal = ({ openDialog, onOpenChange, product }: Dialog) => {
  if (!product) {
    return (
      <AlertDialog open={openDialog} onOpenChange={onOpenChange}>
        <AlertDialogContent className="!w-[90%] !max-w-[768px]">
          <ProductSkeleton />
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  const { images, name, price, description } = product;

  return (
    <AlertDialog open={openDialog} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-full md:max-w-[900px] p-2 pb-4 md:py-10 overflow-y-scroll">
        <AlertDialogCancel
          asChild
          className="border-none outline-none absolute right-0 cursor-pointer"
        >
          <span>
            <CancelIcon />
          </span>
        </AlertDialogCancel>
        <div className="md:flex gap-4">
          <AlertDialogDescription className="mt-8 flex gap-2">
            <div className="flex flex-col gap-4 aspect-square w-[80px]">
              {images.length == 1 ? (
                <Image
                  src={images[0]}
                  alt={name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover bg-gray-100 rounded-md"
                />
              ) : (
                images.map((img) => (
                  <Image
                    priority
                    key={img}
                    src={img}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover bg-gray-100 rounded-md"
                  />
                ))
              )}
            </div>
            <div className="border-3 border-accent w-3/4 max-w-lg rounded-xl bg-gray-200 aspect-square">
              {images.length == 1 ? (
                <Image
                  priority
                  src={images[0]}
                  alt={name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Carousel>
                  <CarouselContent>
                    {images.map((img) => (
                      <CarouselItem key={img}>
                        <Image
                          priority
                          src={img}
                          alt={name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-2" />
                  <CarouselNext className="-right-0" />
                </Carousel>
              )}
            </div>
          </AlertDialogDescription>
          <AlertDialogDescription className="flex flex-col gap-4 pt-2 md:pt-10">
            <AlertDialogHeader className="text-left">
              <AlertDialogTitle className="font-bold">{name}</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="font-medium text-lg">{price}</p>
            <p>{description}</p>
            <div className="flex items-center justify-center">
              <Button variant={"outline"} className="cursor-pointer">
                -
              </Button>
              <div className="w-[40px] h-[36px] flex items-center justify-center bg-accent">
                0
              </div>
              <Button variant={"outline"} className="cursor-pointer">
                +
              </Button>
            </div>
            <Button className="w-full max-w-[120px] mx-auto uppercase">
              add to cart
            </Button>
          </AlertDialogDescription>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertDialogModal;
