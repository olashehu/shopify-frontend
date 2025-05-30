import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import i from "@/public/images/hero-image.svg";

const HeroSection = () => {
  return (
    <section className="bg-[#f2f0f1] px-4 py-8 md:px-8 lg:px-20 flex items-center">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="w-full md:w-2/5 flex flex-col gap-6 text-center md:text-left pt-4">
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight"
          >
            Find products that match your taste
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            Browse through our diverse range of meticulously crafted products,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-3/5 max-w-xl lg:max-w-2xl">
            <Image
              src={i}
              alt="Hero image"
              className="rounded-md aspect-1/1 object-contain w-full"
              priority
            />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
