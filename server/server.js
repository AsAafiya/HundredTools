const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdfRoutes");
const imageRoutes = require("./routes/imageRoute"); 

const app = express();

app.use(cors());

app.use("/api/pdf", pdfRoutes);
app.use("/api/image", imageRoutes); 

app.listen(5000, () => {
  console.log("Server running on port 5000");
});