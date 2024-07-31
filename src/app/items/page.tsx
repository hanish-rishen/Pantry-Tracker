import { PantryItem, columns } from "./columns"
import { DataTable } from "./data-table"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

async function getData(): Promise<PantryItem[]> {
  // In a real application, you would fetch this data from an API or database
  return [
    {
      id: "1",
      name: "Milk",
      quantity: 2,
      expirationDate: "2024-04-15",
      category: "Dairy",
    },
    {
      id: "2",
      name: "Bread",
      quantity: 1,
      expirationDate: "2024-04-10",
      category: "Bakery",
    },
    // ... (add 48 more items here)
  ]
}

export default async function ItemsPage() {
  const data = await getData()

  return (
    <div className="min-h-screen bg-neutral-900 relative w-full">
      <ShootingStars />
      <StarsBackground />
      <div className="container mx-auto py-10 mt-16 relative z-10">
        <h1 className="text-2xl font-bold mb-5 text-white">Pantry Items</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}