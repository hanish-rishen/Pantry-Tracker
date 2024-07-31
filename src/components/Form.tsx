import * as React from "react"

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

export function Form() {
  return (
    <Card className="w-[350px] bg-transparent">
      <CardHeader>
        <CardTitle className="text-white">Add an Item</CardTitle>
        <CardDescription className="text-gray-200">Add a item to your pantry in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="quantity">Quantity</Label>
              <Input id="quantity" placeholder="Quantity" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="expirationDate">Expiration Date</Label>
              <Input id="expirationDate" placeholder="Expiration Date" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white font-bold" htmlFor="category">Category</Label>
              <Select>
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Cancel</Button>
        <Button variant="outline">Add</Button>
      </CardFooter>
    </Card>
  )
}
