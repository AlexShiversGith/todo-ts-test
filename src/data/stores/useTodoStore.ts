import  { create, State, StateCreator } from "zustand";

import { generateId } from "../helpers";

interface Task {
    id: string
    title: string
    tags: RegExpMatchArray | never[]
    createdAt: number
}

interface ToDoStore {
    tasks: Task[]
    createTask: (
        title: string,
    ) => void
    updateTask: (
        id: string, 
        title: string, 
    ) => void
    removeTask: (
        id: string,
    ) => void
    deleteTag: (
        id: string,
        title: string,
        value: string,
    ) => void
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): 
StateCreator<T> => (set, get, api) => config ((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)

const getCurrentState = () => {
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))
        return currentState
    } catch(e) {
        window.localStorage.setItem('tasks', '[]')
    }
    return []
}

const findHashtags = (title: string) => {
    const regexHashtags = /#\S*/ig;
    const hashtags = title.match(regexHashtags);
    return hashtags ? hashtags : [];
}

const functionRedactingTitle = (title: string, value: string) => {
    const newValue = value.replace(/#/ig, '')
    const correctTitle = title.replace(value, newValue)
    return correctTitle
}

export const useTodoStore = create<ToDoStore>(localStorageUpdate(( set, get ) => ({
    tasks: getCurrentState(),
    createTask: (title: string) => {
        const { tasks } = get()
        const newTask = {
            id: generateId(),
            title,
            tags: findHashtags(title), 
            createdAt: Date.now()
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.map(task => ({
                ...task, 
                title: task.id === id ? title : task.title,
                tags: task.id === id ? findHashtags(title) : task.tags,
            })),
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
    deleteTag: (id: string, title: string, value: string) => {
        const { tasks } = get()
        const newTitle = functionRedactingTitle(title, value)
        set({
            tasks: tasks.map(task => ({
                ...task,
                title: task.id === id ? newTitle : task.title,
                tags: task.id === id ? findHashtags(newTitle) : task.tags,
            }))
             
        })
    }
})))