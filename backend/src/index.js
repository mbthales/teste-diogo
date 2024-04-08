const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

const {
  getSmartphonesController,
  createSmartphoneController,
  updateSmartphoneController,
  deleteSmartphoneController,
} = require("./controllers/smartphone");

getSmartphonesController(app);
createSmartphoneController(app);
updateSmartphoneController(app);
deleteSmartphoneController(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
