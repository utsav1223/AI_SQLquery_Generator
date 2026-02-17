import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ToolSelector({ mode, setMode }) {
  const { user } = useContext(AuthContext);

  const tools = [
    { id: "generate", label: "Generate", pro: false },
    { id: "optimize", label: "Optimize", pro: true },
    { id: "validate", label: "Validate", pro: true },
    { id: "explain", label: "Explain", pro: true },
  ];

  const handleClick = (tool) => {
    if (tool.pro && user?.plan !== "pro") {
      alert("Upgrade to Pro to use this feature.");
      return;
    }
    setMode(tool.id);
  };

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {tools.map((tool) => {
        const isLocked = tool.pro && user?.plan !== "pro";
        const isActive = mode === tool.id;

        return (
          <button
            key={tool.id}
            onClick={() => handleClick(tool)}
            disabled={isLocked}
            className={`px-4 py-2 rounded-lg border transition-all
              ${isActive
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"}
              ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
            `}
          >
            {tool.label}
            {isLocked && <span className="ml-2">🔒</span>}
          </button>
        );
      })}
    </div>
  );
}
