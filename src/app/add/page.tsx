import * as React from "react"
import { Form } from "@/components/Form"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Suspense } from 'react'
import Loading from './loading'

export default function AddPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-neutral-900 relative w-full">
        <ShootingStars />
        <StarsBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <Form />
        </div>
      </div>
    </Suspense>
  )
}