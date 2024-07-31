"use client"
import * as React from "react"
import { useRouter } from 'next/navigation'
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"

export function Form() {
  const [name, setName] = React.useState("")
  const [quantity, setQuantity] = React.useState("")
  const [expirationDate, setExpirationDate] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, "pantryItems"), {
        name,
        quantity: Number(quantity),
        expirationDate,
        category,
      })
    } catch (error) {
      console.error("Error adding document: ", error)
      setLoading(false)
    }
  }

  const handleLoaderComplete = () => {
    setLoading(false)
    router.push('/items')
  }

  const loadingStates = [
    { text: "Adding item to pantry..." },
    { text: "Updating inventory..." },
    { text: "Redirecting to items list..." },
  ]

  return (
    <Card className="w-[350px] bg-transparent">
      <CardHeader>
        <CardTitle className="text-white">Add an Item</CardTitle>
        <CardDescription className="text-gray-200">Add an item to your pantry in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of your product" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="quantity">Quantity</Label>
              <Input id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="expirationDate">Expiration Date</Label>
              <Input id="expirationDate" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} placeholder="Expiration Date" type="date" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="meats">Meats</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="destructive" onClick={() => router.push('/items')}>Cancel</Button>
            <Button type="submit" variant="outline">Add</Button>
          </CardFooter>
        </form>
      </CardContent>
      <MultiStepLoader 
        loadingStates={loadingStates} 
        loading={loading} 
        duration={1000} 
        onComplete={handleLoaderComplete}
      />
    </Card>
  )
}