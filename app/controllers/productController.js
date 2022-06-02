const productModel = require("../models/productsModel");

function ProductController() {
  const SELF = {};
  return {
    addProduct: async (request, response) => {
      const product = new productModel(request.body);
      try {
        await product.save();
        response.send(product);
      } catch (error) {
        response.status(500).send(error);
      }
    },
    getProductsList: async (req, res) => {
      const products = await productModel.find({});
      try {
        res.send(products);
      } catch (error) {
        res.status(500).send(error);
      }
    },
    getItems: async (req, res) => {
      try {
        let data;
        if (req.query._id) {
          data = await productModel.findOne({ _id: req.query._id });
        } else {
          data = await productModel.find();
        }

        if (req.query.page) {
          data = data.slice(req.query.page * 3, req.query.page * 3 + 3);
        }
        //console.log(data)
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
        res.status(500).send("err");
      }
    },

    updateItems: async (req, res) => {
      console.log(req.body);
      try {
        const data = req.body;
        const post = await productModel.findOneAndUpdate(
          { _id: data._id },
          data,
          {
            new: true,
          }
        );
        res.status(200).send(post);
      } catch (err) {
        console.log(err);
        res.status(500).send("err");
      }
    },
  };
}

module.exports = new ProductController();
