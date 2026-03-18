export default function PreviewCard({ data }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16 }}>
      <h3>Preview</h3>

      <div>
        <strong>Text:</strong>
        <div style={{ overflowWrap: "break-word" }}>
          {data.text ?? "NULL"}
        </div>
      </div>

      <div>
        <strong>Number:</strong> {String(data.number)}
      </div>

      <div>
        <strong>Image:</strong>
        {data.image ? (
          <img src={data.image} width={120} />
        ) : (
          "No image"
        )}
      </div>
    </div>
  )
}
