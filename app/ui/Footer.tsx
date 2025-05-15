// components/Footer.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black mt-20">
      {/* Black Offer Banner */}
      <div className="bg-black text-white py-10 px-6 md:px-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 opacity-55">
          STAY UPTO DATE ABOUT <br className="hidden md:block" /> OUR LATEST
          OFFERS
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg pt-3">
          <Input
            placeholder="Enter your email address"
            className="rounded-full"
          />
          <Button className="rounded-full bg-white text-black hover:bg-gray-200 transition">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="py-12 px-4 md:px-8 lg:px-20 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-bold mb-4">SHOP.CO</h3>
          <p className="mb-4 text-gray-500">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex gap-4 text-black">
            <Twitter size={20} />
            <Facebook size={20} />
            <Instagram size={20} />
          </div>
        </div>

        {/* Column Links */}
        {[
          { title: "Company", links: ["About", "Features", "Works", "Career"] },
          {
            title: "Help",
            links: [
              "Customer Support",
              "Delivery Details",
              "Terms & Conditions",
              "Privacy Policy",
            ],
          },
          {
            title: "FAQ",
            links: ["Account", "Manage Deliveries", "Orders", "Payments"],
          },
          {
            title: "Resources",
            links: [
              "Free eBooks",
              "Development Tutorial",
              "How to – Blog",
              "YouTube Playlist",
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2 text-gray-600">
              {section.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Strip */}
      <div className="border-t px-6 md:px-20 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>Olasheu © 2000-2025. All Rights Reserved</p>
        <div className="flex gap-2 mt-2 md:mt-0">
          <img src="/icons/visa.svg" alt="Visa" className="h-6" />
          <img src="/icons/mastercard.svg" alt="MasterCard" className="h-6" />
          <img src="/icons/paypal.svg" alt="PayPal" className="h-6" />
          <img src="/icons/applepay.svg" alt="Apple Pay" className="h-6" />
        </div>
      </div>
    </footer>
  );
}
