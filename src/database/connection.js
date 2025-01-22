import { drizzle } from "drizzle-orm/neon-http";
import config from "config";

export default drizzle(config.get("database.connectionString"));
