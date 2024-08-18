import e from "express";

const PORT1 = 3000;
const PORT2 = 3001;

const app1 = e();
const app2 = e();

app1.get("/name", (req, res) => {
  res.send("My name is Anshal Server 1");
});
app1.get("/age", (req, res) => {
  res.send("My age is 20 Server 1");
});
app2.get("/name", (req, res) => {
  res.send("My name is Anshal Server 2");
});
app2.get("/age", (req, res) => {
  res.send("My age is 20 Server 2");
});

app1.listen(PORT1, () => {
  console.log(`Server 1 Ready On Port ${PORT1}`);
});
app2.listen(PORT2, () => {
  console.log(`Server 1 Ready On Port ${PORT2}`);
});
