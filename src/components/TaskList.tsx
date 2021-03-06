import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [arrayOfIds, setArrayOfIds] = useState<number[]>([]);
  var taskId: number = 0
  
  function handleCreateNewTask() {
    if(newTaskTitle){
      do {
        taskId = Math.floor(Math.random() * 1000000000)
      } while(arrayOfIds.includes(taskId))
      
      setArrayOfIds([...arrayOfIds, taskId])
  
      const newTask: Task = {
        id: taskId,
        title: newTaskTitle,
        isComplete: false,
      }

      setTasks([...tasks, newTask])

      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    var copyTasks: Task[] = tasks
    var taskIndex: number = copyTasks.findIndex(task => task.id === id)
    copyTasks[taskIndex].isComplete = !copyTasks[taskIndex].isComplete
    setTasks([...copyTasks])
  }

  function handleRemoveTask(id: number) {
    var copyTasks: Task[] = tasks
    var taskIndex: number = copyTasks.findIndex(task => task.id === id)
    copyTasks.splice(taskIndex, 1)
    setTasks([...copyTasks])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}