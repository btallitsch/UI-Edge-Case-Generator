export default function ControlPanel({ onGenerate, onToggle, stress }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={onGenerate}>Generate</button>
      <button onClick={onToggle} style={{ marginLeft: 10 }}>
        Stress Mode: {stress ? "ON" : "OFF"}
      </button>
    </div>
  )
}
