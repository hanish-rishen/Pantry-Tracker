"use client";
import React from "react";

export const Menu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <nav className="relative rounded-full border border-white bg-transparent backdrop-blur-sm flex justify-center space-x-4 px-8 py-6 text-white font-bold mx-2">
      {children}
    </nav>
  );
};