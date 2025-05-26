"use client";

import { useState } from "react";
import Signup from "@/app/ui/signup/Signup";


export default function Page() {
  const [tab, setTab] = useState("buyer");

  function onHandleClick(t: string) {
    if (t === tab) return;
    setTab(t);
  }
  return (
    <div className="w-full max-w-[400px] mx-auto mt-8 shadow-sm py-6">
      <div className="bg-accent max-w-[300px] mx-auto flex items-center rounded-[8px]">
        <button
          className={`flex-1 h-7 capitalize cursor-pointer text-gray-400 ${
            tab == "buyer" ? "bg-white font-bold text-gray-900" : ""
          }`}
          onClick={() => onHandleClick("buyer")}
        >
          buyer
        </button>
        <button
          className={`flex-1 h-7 capitalize cursor-pointer text-gray-400 ${
            tab == "seller" ? "bg-white font-bold text-gray-900" : ""
          }`}
          onClick={() => onHandleClick("seller")}
        >
          seller
        </button>
      </div>
      <Signup tab={tab} />
    </div>
  );
}
