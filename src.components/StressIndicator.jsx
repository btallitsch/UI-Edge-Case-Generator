export default function StressIndicator({ active }) {
  return (
    <div style={{ color: active ? "red" : "gray" }}>
      {active ? "⚡ Stress Testing Active" : "Idle"}
    </div>
  )
}
