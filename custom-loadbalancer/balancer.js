import express from "express";

const PORT = 8080;
const app = express();

const servers = ["http://localhost:3000", "http://localhost:3001"];
let currentServer = 0;

const handleRequest = async (req, res, next) => {
  if (currentServer === servers.length) currentServer = 0;
  const server = servers[currentServer];
  try {
    const data = await fetch(`${server}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
    const response = await data.text();
    res.send(response);
    currentServer++;
  } catch (error) {
    next(error);
  }
};

app.get("/favicon.ico", (req, res) => res.sendFile("/favicon.ico"));

app.use(handleRequest);

app.use((error, req, res, next) => {
  if (error) {
    res.send(error?.message);
  }
});

app.listen(PORT, () => {
  console.log(`Load Balancer Ready On Port ${PORT}`);
});
