const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));



app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
});