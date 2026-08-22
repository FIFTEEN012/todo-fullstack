"use server"; //บอก Next.js ว่า Function ในไฟล์นี้ต้องรันฝั่ง Server เท่านั้น
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { todos } from "@/db/schema";

export async function createTodo(formData: FormData) {
    const title = formData.get("title"); //อ่านค่าจาก <input name="title" />

    if (typeof title !== "string") { //ตรวจชนิดข้อมูล
        throw new Error("Todo title must be a string");
    }

    const trimmedTitle = title.trim(); //ตัดช่องว่างหน้าและหลัง

    if (!trimmedTitle) { //ป้องกันค่าที่เป็นช่องว่างล้วน เช่น:
        throw new Error("Todo title is required");
    }

    if (trimmedTitle.length > 255) { //ให้ตรงกับ Database Schema ที่กำหนด varchar(255)
        throw new Error("Todo title must be 255 characters or fewer");
    }

    await db.insert(todos).values({ //หมายถึง Insert ข้อมูลเข้า Table:todos
        title: trimmedTitle, //คือข้อมูลของ Row ใหม่
        userId: "temporary-user",
    });

    revalidatePath("/"); //สั่งให้ Next.js revalidate หน้า / (Home) เพื่อให้ข้อมูลใหม่แสดงผล
}

export async function toggleTodo(formData: FormData) { //ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้คลิก Checkbox เพื่อเปลี่ยนสถานะ Todo
    const todoId = formData.get("id"); //อ่านค่าจาก <input name="id" /> ซึ่งเป็น ID ของ Todo ที่ต้องการเปลี่ยนสถานะ
    const completed = formData.get("completed"); //อ่านค่าจาก <input name="completed" /> ซึ่งเป็นสถานะปัจจุบันของ Todo (true/false)

    if (typeof todoId !== "string" || !todoId) { //ตรวจสอบว่า ID เป็น String และไม่ว่าง
        throw new Error("Todo ID is required"); //ถ้าไม่ใช่ String หรือว่าง ให้โยน Error
    }

    if (completed !== "true" && completed !== "false") { //ตรวจสอบว่า completed เป็น String "true" หรือ "false" เท่านั้น
        throw new Error("Invalid completed value"); //ถ้าไม่ใช่ ให้โยน Error
    }

    const nextCompleted = completed === "true"; //แปลงค่า completed จาก String เป็น Boolean (true/false)

    await db
        .update(todos)
        .set({
            completed: nextCompleted,
            updatedAt: new Date(),
        })
        .where(eq(todos.id, todoId)); //หมายถึง Update ข้อมูลใน Table:todos โดยเปลี่ยนค่า completed และ updatedAt ของ Row ที่มี ID ตรงกับ todoId


    revalidatePath("/"); //สั่งให้ Next.js revalidate หน้า / (Home) เพื่อให้ข้อมูลใหม่แสดงผล
}

export async function deleteTodo(formData: FormData) { //ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้คลิกปุ่ม Delete เพื่อทำการลบ Todo
    const todoId = formData.get("id"); //อ่านค่าจาก <input name="id" /> ซึ่งเป็น ID ของ Todo ที่ต้องการลบ

    if (typeof todoId !== "string" || !todoId) { //ตรวจสอบว่า ID เป็น String และไม่ว่าง
        throw new Error("Todo id is required");
    }

    await db.delete(todos).where(eq(todos.id, todoId)); //หมายถึง Delete ข้อมูลใน Table:todos โดยลบ Row ที่มี ID ตรงกับ todoId

    revalidatePath("/"); //สั่งให้ Next.js revalidate หน้า / (Home) เพื่อให้ข้อมูลใหม่แสดงผล

}