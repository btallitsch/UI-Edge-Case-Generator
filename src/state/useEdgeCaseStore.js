import { useState, useEffect } from "react"
import { runEdgeCaseEngine } from "../logic/engine"

export function useEdgeCaseStore() {
  const [data, setData] = useState({})
  const [stress, setStress] = useState(false)

  const generate = () => {
    setData(runEdgeCaseEngine())
  }

  const toggleStress = () => setStress(s => !s)

  useEffect(() => {
    if (!stress) return

    const id = setInterval(() => {
      setData(runEdgeCaseEngine())
    }, 300)

    return () => clearInterval(id)
  }, [stress])

  return {
    data,
    stress,
    generate,
    toggleStress
  }
}
