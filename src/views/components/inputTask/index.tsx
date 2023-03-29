import React, { useEffect, useRef, useState } from "react";

import styles from './index.module.scss'

interface InputTaskProps {
    id: string
    title: string
    tags: RegExpMatchArray | never[]
    onDone: (id: string) => void
    onEdit: (id: string, title: string) => void
    onRemove: (title: string) => void
    onDeleteTag: (id: string, title: string, value: string) => void
    filter: (value: string) => void
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    tags,
    onDone,
    onEdit,
    onRemove,
    onDeleteTag,
    filter,
}) => {
    const [checked, setChecked] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editMode) {
            editTitleInputRef?.current?.focus()
        }
    },[editMode])



    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input 
                    type="checkbox" 
                    disabled={editMode}
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    onChange={e => {
                        setChecked(e.target.checked)
                        if (e.target.checked) {
                            setTimeout(() => {
                                onDone(id)
                            }, 300);
                        }
                    }}
                />
            </label>
                {editMode ? (
                <input 
                    className={styles.inputTaskTitleEdit}
                    value={value}
                    ref={editTitleInputRef}
                    onChange={(e) => 
                        setValue(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onEdit(id, value)
                            setEditMode(false)
                        }
                    }}
                />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
                {editMode ? (
                    <button
                        aria-label="Save"
                        className={styles.inputTaskSave}
                        onClick={() => {
                            onEdit(id, value)
                            setEditMode(false)
                    }}
                ></button>
                ) : (
                    <button
                        aria-label="Edit"
                        className={styles.inputTaskEdit}
                        onClick={() => {
                            setEditMode(true)
                        }}
                    ></button>
                )}
                
                <button
                    aria-label="Remove"
                    className={styles.inputTaskRemove}
                    onClick={() => {
                        if(confirm('Are u shure?')){
                            onRemove(id)
                        }
                    }}
                ></button>
                <div className={styles.hashtags}>
                    {tags.map((item, index) => 
                    <div
                        className={styles.hashtagsItem}
                        key={index}
                    >
                        <button 
                            className={styles.hashtagsButton}
                            onClick={() => {
                                filter(item)
                            }}
                        >{item}</button>
                        <button 
                            className={styles.hashtagsButton}
                            onClick={() => {
                                onDeleteTag(id, title, item)
                            }}
                        >x</button>
                    </div>)}
                </div>
        </div>
    )
}