import { config } from "dotenv"; // นำเข้า config จาก dotenv เพื่อโหลด Environment Variable
import { defineConfig } from "drizzle-kit"; // นำเข้า defineConfig จาก drizzle-kit เพื่อใช้ในการกำหนดค่า Drizzle

config({ path: ".env.local" }); // โหลด Environment Variable จากไฟล์ .env.local

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
    schema: "./db/schema.ts", //บอก Drizzle ว่า Schema อยู่ตรงไหน
    out: "./db/drizzle",
    dialect: "postgresql", // บอก Drizzle ว่าเราจะใช้ Database แบบไหน
    dbCredentials: {
        url:process.env.DATABASE_URL,
    }, // ใช้ Connection String จาก Environment Variable แทนการเขียน Secret ลงใน Code
})