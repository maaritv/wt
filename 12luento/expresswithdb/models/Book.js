const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

//paikallisen mongodb:n url on muotoa:
//mongodb://username:passwordlocalhost:27017
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishYear: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

BookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Book", BookSchema);
