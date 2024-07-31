import { MultiStepLoader } from "@/components/ui/multi-step-loader"

export default function Loading() {
  const loadingStates = [
    { text: "Loading page..." },
  ]

  return (
    <div className="min-h-screen bg-neutral-900 relative w-full flex items-center justify-center">
      <MultiStepLoader 
        loadingStates={loadingStates} 
        loading={true} 
        duration={1000} 
      />
    </div>
  )
}