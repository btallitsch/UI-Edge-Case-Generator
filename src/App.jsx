import { useEdgeCaseStore } from "./state/useEdgeCaseStore"
import ControlPanel from "./components/ControlPanel"
import PreviewCard from "./components/PreviewCard"
import StressIndicator from "./components/StressIndicator"

export default function App() {
  const { data, stress, generate, toggleStress } = useEdgeCaseStore()

  return (
    <div style={{ padding: 20 }}>
      <h1>UI Edge Case Generator</h1>

      <ControlPanel
        onGenerate={generate}
        onToggle={toggleStress}
        stress={stress}
      />

      <StressIndicator active={stress} />

      <PreviewCard data={data} />
    </div>
  )
}
