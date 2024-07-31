"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Form } from "./Form";

export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="min-h-screen bg-neutral-900 relative w-full">
      <ShootingStars />
      <StarsBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <Form />
      </div>
    </div>
  );
}