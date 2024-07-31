import { PantryItem, columns } from "./columns"
import { DataTable } from "./data-table"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

async function getData(): Promise<PantryItem[]> {
  const querySnapshot = await getDocs(collection(db, "pantryItems"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PantryItem[];
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