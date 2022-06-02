const storeModel = require("../models/storesModels");
const firebase = require("../../firebase");
function storeController() {
  const SELF = {};
  return {
    addStore: async (req, res) => {
      console.log(req.file);
      if (req.body.managerId) {
        if (!req.file) {
          return res.status(400).send("Error: No files found");
        }
        try {
          const blob = firebase.bucket.file(req.file.originalname);

          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });

          blobWriter.on("error", (err) => {
            console.log(err);
          });
          const coverImageLink = `https://firebasestorage.googleapis.com/v0/b/${
            firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
          console.log(coverImageLink);

          blobWriter.end(req.file.buffer);
          const data = {
            ...req.body,
            image: coverImageLink,
          };

          const store = new storeModel(data);

          await store.save();
          res.send(store);
        } catch (error) {
          res.status(500).send(error);
        }
      } else {
         res.status(403).send("user not found!");
      }
    },
    getListStores: async (req, res) => {
      const stores = await storeModel.find({});
      try {
        res.send(stores);
      } catch (error) {
        res.status(500).send(error);
      }
    },
    getStore: async (req, res) => {
      try {
        let data;
        if (req.query._id) {
          data = await storeModel.findOne({ _id: req.query._id });
        } else {
          data = await storeModel.find();
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

    updateStore: async (req, res) => {
      console.log(req.body);
      try {
        const data = req.body;
        const post = await storeModel.findOneAndUpdate(
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

module.exports = new storeController();
