const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  categoryID: {type: String, required: false},
  quantity: {type: Number, default: 50},
  supplierID: {type: String, required: false},
  price: {type: Number, default: 0},
  image: {type: String},
  NSX: {type: String},
  NHH: {type: String},
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;