"use client"
import { PantryItem, columns } from "./columns"
import { DataTable } from "./data-table"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useState, useEffect } from "react"

async function getData(): Promise<PantryItem[]> {
  const querySnapshot = await getDocs(collection(db, "pantryItems"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PantryItem[];
}

export default function ItemsPage() {
  const [data, setData] = useState<PantryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getData().then(fetchedData => {
      setData(fetchedData)
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "pantryItems", id))
      setData(prevData => prevData.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error deleting document: ", error)
    }
  }

  const tableColumns = columns(handleDelete)

  return (
    <div className="min-h-screen bg-neutral-900 relative w-full">
      <ShootingStars />
      <StarsBackground />
      <div className="container mx-auto py-10 mt-16 relative z-10">
        <h1 className="text-2xl font-bold mb-5 text-white">Pantry Items</h1>
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <DataTable columns={tableColumns} data={data} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}