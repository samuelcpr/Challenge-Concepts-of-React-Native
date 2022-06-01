import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim() !== "") {
        const newTask = {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        }
        setTasks(oldState => [...oldState, newTask])
    }
  }

  function handleMarkTaskAsDone(id: number) {
    let newTask = tasks.find(task => task.id === id) as Task
    const newList = tasks.filter(task => task.id !== id)

    if (newTask) {      
      newTask.done = !newTask.done
      setTasks(oldState => [...newList, newTask])
    }
  }

  function handleRemoveTask(id: number) {
    const newList = tasks.filter(task => task.id !== id)

    setTasks(oldState => newList)
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}