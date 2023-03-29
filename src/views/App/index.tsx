import React, { useEffect, useState } from "react";

import { useTodoStore } from "../../data/stores/useTodoStore";
import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/inputTask";

import styles from './index.module.scss'

export const App: React.FC = () => {
    const [
        tasks,
        createTask, 
        updateTask, 
        removeTask,
        deleteTag,
    ]
     = useTodoStore(state => [ 
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.deleteTag,
    ])
    //console.log(tasks)

    useEffect(() => {
        setIsFiltered(tasks)
    }, [tasks])

    const [isFiltered, setIsFiltered] = useState(tasks)
    const filter = (value: string) => {
        const arrOfFilteredValues: any[] = [];
        const filteredData = [];
        tasks.map(item => arrOfFilteredValues.push(item.tags.filter(item => item === value)));
        for (let i = 0; i < tasks.length; i++) {
            if (arrOfFilteredValues[i].length > 0) {
                filteredData.push(tasks[i])
            }
        }   
        setIsFiltered(filteredData)
    }

    return (
        <article className={styles.article}>
            <div>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <div className={styles.articleText}>What are you going to do today?</div>
                )}
                {isFiltered.map(task => (
                    <InputTask 
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        tags={task.tags}
                        onDone={removeTask}
                        onEdit={updateTask}
                        onRemove={removeTask}
                        onDeleteTag={deleteTag}
                        filter={filter}
                    />
                ))}
            </section>
            <button
                onClick={() => setIsFiltered(tasks)}
            >Reset filter</button>
            </div>
        </article>
    );
}