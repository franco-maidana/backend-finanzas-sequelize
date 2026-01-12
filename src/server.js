const { app } = require("./app");
const { env } = require("./config/env");
const { sequelize } = require("./config/db");

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(env.port, () => {
      console.log(`Servicio de finanzas corriendo en el puerto ${env.port}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos", error);
    process.exit(1);
  }
}

start();
