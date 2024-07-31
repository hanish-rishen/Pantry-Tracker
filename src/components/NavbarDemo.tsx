"use client";
import React from "react";
import { Menu } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="w-full p-2 overflow-hidden">
      <Navbar />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn("fixed inset-x-0 top-2 max-w-2xl mx-auto z-50", className)}
    >
      <Menu>
        <Link href="/items" className="text-white font-bold hover:text-gray-200 transition-colors mr-4">
          Your Items
        </Link>
        <Link href="/add" className="text-white font-bold hover:text-gray-200 transition-colors">
          Add Items
        </Link>
      </Menu>
    </div>
  );
}