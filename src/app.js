const express = require("express");
const cors = require("cors");

const ventasRoutes = require("./routes/ventas.routes");
const gastosRoutes = require("./routes/gastos.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const importRoutes = require("./routes/import.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/ventas", ventasRoutes);
app.use("/gastos", gastosRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/import-json", importRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

module.exports = { app };
