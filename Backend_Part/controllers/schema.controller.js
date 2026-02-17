const SchemaModel = require("../models/Schema");

// 🔹 Save or Update Schema
exports.saveSchema = async (req, res) => {
  try {
    const { schemaText } = req.body;

    if (!schemaText || !schemaText.trim()) {
      return res.status(400).json({
        message: "Schema cannot be empty"
      });
    }

    if (schemaText.length > 20000) {
      return res.status(400).json({
        message: "Schema exceeds maximum size (20KB)"
      });
    }

    const schema = await SchemaModel.findOneAndUpdate(
      { userId: req.user.userId },
      { schemaText },
      { new: true, upsert: true }
    );

    res.json({
      message: "Schema saved successfully",
      lastUpdated: schema.updatedAt,
      size: Buffer.byteLength(schema.schemaText, "utf8")
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save schema"
    });
  }
};

// 🔹 Get Schema
exports.getSchema = async (req, res) => {
  try {
    const schema = await SchemaModel.findOne({
      userId: req.user.userId
    });

    if (!schema) {
      return res.json({
        schemaText: "",
        lastUpdated: null,
        size: 0
      });
    }

    res.json({
      schemaText: schema.schemaText,
      lastUpdated: schema.updatedAt,
      size: Buffer.byteLength(schema.schemaText, "utf8")
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch schema"
    });
  }
};
