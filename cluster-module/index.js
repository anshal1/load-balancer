import express from "express";
import cluster from "cluster";
import { cpus } from "os";

const noOfCPU = cpus().length;
const app = express();
const PORT = process.env.PORT || 5000;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < noOfCPU; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(PORT, (err) => {
    err
      ? console.log("Error in server setup")
      : console.log(`Worker ${process.pid} started`);
  });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});
