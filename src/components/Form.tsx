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
  const [errors, setErrors] = React.useState({
    name: "",
    quantity: "",
    expirationDate: "",
    category: ""
  })
  const router = useRouter()

  const loadingStates = [
    { text: "Adding item to pantry..." },
    { text: "Updating inventory..." },
    { text: "Redirecting to items list..." },
  ]

  const validateInput = () => {
    let isValid = true
    const newErrors = { name: "", quantity: "", expirationDate: "", category: "" }

    if (name.trim() === "") {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!/^\d+$/.test(quantity)) {
      newErrors.quantity = "Quantity must be a positive integer"
      isValid = false
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(expirationDate)) {
      newErrors.expirationDate = "Invalid date format. Use YYYY-MM-DD"
      isValid = false
    }

    if (category === "") {
      newErrors.category = "Category is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateInput()) return

    setLoading(true)
    try {
      await addDoc(collection(db, "pantryItems"), {
        name,
        quantity: Number(quantity),
        expirationDate,
        category,
      })
      // Wait for 3 seconds to show the loading states
      await new Promise(resolve => setTimeout(resolve, 3000))
    } catch (error) {
      console.error("Error adding document: ", error)
    } finally {
      setLoading(false)
      router.push('/items')
    }
  }

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
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name of your product" 
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                placeholder="Quantity" 
                type="number" 
              />
              {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="expirationDate">Expiration Date</Label>
              <Input 
                id="expirationDate" 
                value={expirationDate} 
                onChange={(e) => setExpirationDate(e.target.value)} 
                placeholder="YYYY-MM-DD" 
                type="date" 
              />
              {errors.expirationDate && <span className="text-red-500 text-sm">{errors.expirationDate}</span>}
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
              {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
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
      />
    </Card>
  )
}