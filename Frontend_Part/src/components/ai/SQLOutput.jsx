export default function SQLOutput({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Result</h3>

      <div className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-auto">
        <pre className="whitespace-pre-wrap text-sm">
          {result}
        </pre>
      </div>
    </div>
  );
}
