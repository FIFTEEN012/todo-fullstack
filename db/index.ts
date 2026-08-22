import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL); //สร้าง Client สำหรับคุยกับ Neon ผ่าน HTTP

export const db = drizzle({ //นำ Client นั้นมาให้ Drizzle ใช้
    client: sql, //บอก Drizzle ว่าเราจะใช้ Client ตัวไหน
    schema, //บอก Drizzle ว่า Schema อยู่ตรงไหน
})