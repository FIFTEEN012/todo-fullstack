"use client"; //ทำให้ Component นี้สามารถใช้ Browser interaction และ React Hooks ได้
import { useRef } from "react"; //นำเข้า useRef จาก React เพื่อสร้าง reference ไปยัง form element
import { createTodo } from "@/app/actions/todos";  //นำเข้า createTodo action จากไฟล์ actions/todos เพื่อใช้ในการสร้าง Todo ใหม่
import { useFormStatus } from "react-dom"; //นำเข้า useFormStatus จาก react-dom เพื่อใช้ตรวจสอบสถานะของ form ว่ากำลังส่งข้อมูลอยู่หรือไม่

function SubmitButton() { //สร้าง Component สำหรับปุ่ม Submit
  const { pending } = useFormStatus(); //ใช้ useFormStatus เพื่อดึงสถานะ pending ของ form ว่ากำลังส่งข้อมูลอยู่หรือไม่

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null); //สร้าง reference ไปยัง form element โดยใช้ useRef และกำหนด type

  async function handleSubmit(formData: FormData) {
    await createTodo(formData); //เรียกใช้ createTodo action และส่ง formData ไปเพื่อสร้าง Todo ใหม่

    formRef.current?.reset(); //รีเซ็ต form หลังจากสร้าง Todo ใหม่เสร็จแล้ว โดยใช้ reference ที่สร้างขึ้น
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="mt-4 flex gap-2"
    >
      <label htmlFor="todo-title" className="sr-only">
        Todo title
      </label>

      <input
        id="todo-title"
        name="title"
        type="text"
        placeholder="What needs to be done?"
        className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
      />

      <SubmitButton /> 
    </form>
  );
}