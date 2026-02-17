const User = require("../models/User");
const SchemaModel = require("../models/Schema");
const Query = require("../models/Query");
const { callGemini } = require("../utils/geminiClient");
const { checkAndUpdateUsage } = require("../utils/usageManager");

// exports.handleAI = async (req, res) => {
//   try {
//     const { mode, prompt, sql } = req.body;

//     if (!mode) {
//       return res.status(400).json({ message: "Mode is required" });
//     }

//     const user = await User.findById(req.user.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🔐 Plan restrictions
//     if (user.plan === "free" && mode !== "generate") {
//       return res.status(403).json({
//         message: "Upgrade to Pro to use this feature."
//       });
//     }

//     let finalPrompt = "";

//     const schemaData = await SchemaModel.findOne({
//       userId: user._id
//     });

//     const schemaText = schemaData?.schemaText || "No schema provided.";

//     switch (mode) {
//       case "generate":
//         if (!prompt)
//           return res.status(400).json({ message: "Prompt required" });

//         finalPrompt = `
// You are an expert SQL engineer.

// Database Schema:
// ${schemaText}

// Convert request to SQL.
// Return only SQL. No explanation.

// Request:
// ${prompt}
// `;
//         break;

//       case "optimize":
//         finalPrompt = `
// Optimize this SQL query for performance.
// Return only optimized SQL.

// Query:
// ${sql}
// `;
//         break;

//       case "validate":
//         finalPrompt = `
// Fix syntax or logical issues in this SQL.
// Return corrected SQL only.

// Query:
// ${sql}
// `;
//         break;

//       case "explain":
//         finalPrompt = `
// Explain this SQL query clearly.

// Query:
// ${sql}
// `;
//         break;

//       case "format":
//         const { format } = require("sql-formatter");
//         return res.json({ result: format(sql) });

//       default:
//         return res.status(400).json({ message: "Invalid mode" });
//     }

//     // 🔥 Usage check
//     await checkAndUpdateUsage(user);

//     // 🚀 Call Gemini
//     const result = await callGemini(finalPrompt);

//     if (!result) {
//       return res.status(500).json({ message: "AI failed" });
//     }

//     // 💾 Save history
//     await Query.create({
//       userId: user._id,
//       prompt: prompt || sql,
//       generatedSQL: result,
//       mode
//     });

//     res.json({ result });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };


// if (mode !== "generate" && user.plan !== "pro") {
//   return res.status(403).json({
//     message: "Upgrade to Pro to use this feature"
//   });
// }





exports.handleAI = async (req, res) => {
  try {
    const { mode, prompt, sql } = req.body;

    if (!mode) {
      return res.status(400).json({ message: "Mode is required" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Pro feature restriction
    if (mode !== "generate" && user.plan !== "pro") {
      return res.status(403).json({
        message: "Upgrade to Pro to use this feature."
      });
    }

    if (["optimize", "validate", "explain", "format"].includes(mode) && !sql) {
      return res.status(400).json({ message: "SQL is required" });
    }

    let finalPrompt = "";

    const schemaData = await SchemaModel.findOne({
      userId: user._id
    });

    const schemaText = schemaData?.schemaText || "No schema provided.";

    switch (mode) {
      case "generate":
        if (!prompt)
          return res.status(400).json({ message: "Prompt required" });

        finalPrompt = `
You are an expert SQL engineer.

Database Schema:
${schemaText}

Convert request to SQL.
Return only SQL. No explanation.

Request:
${prompt}
`;
        break;

      case "optimize":
        finalPrompt = `
Optimize this SQL query for performance.
Return only optimized SQL.

Query:
${sql}
`;
        break;

      case "validate":
        finalPrompt = `
Fix syntax or logical issues in this SQL.
Return corrected SQL only.

Query:
${sql}
`;
        break;

      case "explain":
        finalPrompt = `
Explain this SQL query clearly.

Query:
${sql}
`;
        break;

      case "format":
        const { format } = require("sql-formatter");
        return res.json({ result: format(sql) });

      default:
        return res.status(400).json({ message: "Invalid mode" });
    }

    // 🔥 Free usage control
    await checkAndUpdateUsage(user);

    // 🚀 AI Call
    const result = await callGemini(finalPrompt);

    if (!result) {
      return res.status(500).json({ message: "AI failed" });
    }




    // 🔹 Clean markdown formatting
    let cleanResult = result
      .replace(/```sql/gi, "")
      .replace(/```/g, "")
      .trim();
    // 💾 Save history
    await Query.create({
      userId: user._id,
      prompt: prompt || sql,
      generatedSQL: result,
      mode
    });

    res.json({ result });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
