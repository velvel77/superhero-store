"use client";

import Link from "next/link"; 
import { Plus } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="bg-basic-900 px-8 py-5 flex items-center justify-between shadow-sm"> 
      <div>
        <h1 className="text-2xl font-semibold text-basic-100">
          Product management
        </h1>
        <p className="text-sm text-basic-300 mt-1">
          Manage your store inventory
        </p>
      </div>
     <Link
        href="/products/add-product"
        className="bg-primary-500 hover:bg-primary-400 text-basic-900 px-5 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition"
      >
        <Plus className="w-5 h-5" />
        <span>Add product</span>
    </Link>
     
    </div>
  );
}


// // I wrote the code this way because adding a new product requires filling out a form,
// // so we navigate to a separate page instead of using an onClick handler here.
