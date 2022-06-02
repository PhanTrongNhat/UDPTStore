const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  managerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  image: { type: String, required: false },
  GPKD: { type: String, required: false },
  CNATTP: { type: String, required: false },
});

const Product = mongoose.model("partners", ProductSchema);

module.exports = Product;