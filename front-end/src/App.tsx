import axios from "axios"
import { useEffect, useState } from "react"

import { CreateTaskDialog } from "./components/create-task-dialog"
import { TextAnimate } from "./components/magicui/text-animate"
import { TaskCard } from "./components/task-card"
import { TaskListExample } from "./components/task-list-example"
import { ThemeSwitch } from "./components/theme-switch"
import { Separator } from "./components/ui/separator"

export function App() {
  const [tasks, setTasks] = useState([])

  // Conexão com a API | GET - Retorna as tarefas
  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:3333/tasks")
      setTasks(response.data)
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white dark:bg-zinc-200">
      <header className="flex items-center justify-between px-20 py-12 max-[410px]:flex-col max-[410px]:gap-2">
        <h2 className="font-heading text-4xl font-bold dark:text-black">
          To Do List
        </h2>

        <ThemeSwitch />
      </header>

      <main className="flex flex-col">
        <section className="flex flex-col items-center justify-center gap-40 pt-12 pb-64">
          <h1 className="font-heading text-6xl max-[690px]:text-4xl max-[410px]:text-2xl max-[335px]:text-xl dark:text-black">
            <TextAnimate animation="slideLeft" by="character" duration={6}>
              Gerencie suas próprias tarefas.
            </TextAnimate>
          </h1>

          <div className="flex flex-col gap-6">
            <TaskListExample />
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        <section className="flex flex-col items-center gap-20 py-68">
          <h1 className="font-heading text-6xl max-[690px]:text-4xl max-[410px]:text-2xl max-[335px]:text-xl dark:text-black">
            <TextAnimate animation="slideLeft" by="character" duration={6}>
              Crie suas tarefas abaixo.
            </TextAnimate>
          </h1>

          <div className="flex flex-col items-center gap-6">
            <CreateTaskDialog onTaskCreated={fetchTasks} />

            <TaskCard tasks={tasks} onTaskChanged={fetchTasks} />
          </div>
        </section>
      </main>

      <footer className="font-heading text-md flex items-center justify-center py-12 font-semibold dark:text-black">
        <h3>&copy; Feito por Caio Gomes</h3>
      </footer>
    </div>
  )
}
