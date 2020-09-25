import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sql } from "./database/database";
import router from "./routes/routes";
const app = express();
// Sincronizacion base de datos
sql.sync({ force: true }).then(() => {
  console.log("Data Base Sync");
});
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

// Seetings
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
