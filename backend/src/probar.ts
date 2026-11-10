import { pool, probarConexion } from "./config/database.js";
import { listarCitas } from "./repositories/cita.repository.js";
console.log("Carpeta actual:", process.cwd());
console.log("DB_USER:", JSON.stringify(process.env.DB_USER));
console.log("DB_NAME:", JSON.stringify(process.env.DB_NAME));
console.log("DB_PASSWORD (largo):", process.env.DB_PASSWORD?.length);
await probarConexion();
console.log(await listarCitas());

await pool.end();