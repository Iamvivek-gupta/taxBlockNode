const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const loanRouter = require("./routes/loanRoute");
const app = express();

dotenv.config({ path: "./config.env" });
console.log(app.get('env'))

// connect Mongodb Compass

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("databas connected");
  })
  .catch((error) => {
    console.log(error);
  });


app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/loans", loanRouter);


// 4) START SERVERS
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on Port ${port}...`);
});
