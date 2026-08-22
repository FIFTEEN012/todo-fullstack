import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
 
export const todos = pgTable("todos", {   //หมายถึงสร้าง Table ชื่อ: todos
    id: uuid("id").defaultRandom().primaryKey(), //หมายถึงสร้าง Column ชื่อ: id, type: uuid, default value: random uuid, primary key

    title: varchar("title", { length: 255}).notNull(), //หมายถึงสร้าง Column ชื่อ: title, type: varchar, length: 255, not null

    completed: boolean("completed").notNull().default(false), //หมายถึงสร้าง Column ชื่อ: completed, type: boolean, not null, default value: false

    createdAt: timestamp("created_at", { withTimezone: true }) //ใช้เก็บวันเวลาแบบมี timezone เหมาะกว่า timestamp ธรรมดาสำหรับระบบ Production
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),

    userId: text("user_id").notNull(), // หมายถึงสร้าง Column ชื่อ: user_id, type: text, not null
});