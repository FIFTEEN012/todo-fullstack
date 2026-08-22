import { createTodo, toggleTodo, deleteTodo } from "@/app/actions/todos";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { TodoForm } from "@/components/todo-form";


export default async function Home() {

  const todoItems = await db.select().from(todos); //เลือกข้อมูลทุก Row จาก Table todos

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-950">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Todo Fullstack</h1>

          <p className="mt-2 text-zinc-600">
            Manage your tasks and stay focused.
          </p>
        </header>

        <section
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          aria-labelledby="todo-heading"
        >
          <h2 id="todo-heading" className="text-lg font-semibold">
            My Tasks ({todoItems.length})
          </h2>

          <TodoForm />

          {todoItems.length === 0 ? ( //ตรวจว่า Array ว่างหรือไม่
            <div className="mt-6 rounded-lg border border-dashed border-zinc-300 p-8 text-center">
              <p className="text-sm text-zinc-500">No tasks yet.</p>
            </div>
          ) : (
            <ul className="mt-6 space-y-2">
              {todoItems.map((todo) => ( //วนลูปข้อมูลใน Array todoItems เพื่อสร้างรายการ Todo
                <li
                  key={todo.id} //ใช้ id ของ Todo เป็น key เพื่อให้ React สามารถติดตามรายการได้อย่างถูกต้อง
                  className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3"
                >
                  <p
                    className={
                      todo.completed
                        ? "font-medium text-zinc-400 line-through"
                        : "font-medium"
                    } //แสดงข้อความของ Todo และปรับสไตล์ตามสถานะ completed
                  >
                    {todo.title}
                  </p>

                  <div className="flex shrink-0 items-center gap-2">
                    <form action={toggleTodo}>
                      <input type="hidden" name="id" value={todo.id} />

                      <input
                        type="hidden"
                        name="completed"
                        value={todo.completed ? "false" : "true"}
                      />

                      <button
                        type="submit"
                        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-100"
                      >
                        {todo.completed ? "Undo" : "Complete"}
                      </button>
                    </form>

                    <form action={deleteTodo}>
                      <input type="hidden" name="id" value={todo.id} />

                      <button
                        type="submit"
                        className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>

                </li>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>
  );
}