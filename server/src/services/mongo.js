const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:EUTIBiplo3zJlrKl@cluster0.nb4kj.mongodb.net/nasa?retryWrites=true&w=majority";


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  });
}

module.exports = {mongoConnect};