export default function SQLInput({
  value,
  onChange,
  mode,
  onSubmit,
  loading
}) {
  return (
    <div className="mb-6">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          mode === "generate"
            ? "Example: Get all users who signed up last month"
            : "Paste your SQL query here..."
        }
        className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Run"}
      </button> */}
    </div>
  );
}
