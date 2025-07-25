import React, { useCallback, useEffect } from "react";
import ToDoRow from "../common/ToDoRow";
import AddNewItem from "../common/AddNewItem";
import { useList } from "./useList";

interface TodoItem extends Record<string, unknown> {
    id: string;
    title: string;
    isCompleted: boolean;
}
const TodoListID = "todoList";
const ReducerList: React.FC = () => {
    const {
        addList,
        getList,
        deleteAtIndex,
        updateAtIndex,
        addElementInList
    } = useList();

    useEffect(() => {
        addList(TodoListID, []);
    }, [addList]);

    const [editID, setEditID] = React.useState<string | null>(null);


    const todoList = getList<TodoItem>(TodoListID);

    const onDeleteClick = useCallback((id: string) => {
        deleteAtIndex(TodoListID, todoList.findIndex(todo => todo.id === id));
    }, [deleteAtIndex, todoList]);

    const onToggleClick = useCallback((id: string) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const updatedTodo = { ...todoList[index], isCompleted: !todoList[index].isCompleted };
            updateAtIndex(TodoListID, index, updatedTodo);
        }
    }, [todoList, updateAtIndex]);

    const onAddNewItem = useCallback((title: string) => {
        if (editID) {
            const index = todoList.findIndex(todo => todo.id === editID);
            if (index !== -1) {
                const updatedTodo = { ...todoList[index], title };
                updateAtIndex(TodoListID, index, updatedTodo);

                setEditID(null);
            }
        } else {
            const newTodo: TodoItem = {
                id: Date.now().toString(),
                title,
                isCompleted: false
            };
            addElementInList(TodoListID, newTodo);
        }
    }, [addElementInList, editID, todoList, updateAtIndex]);

    const onEditClick = useCallback((id: string) => {
        setEditID(id);
    }, []);

    return (
        <div
            className="m-3 border-t-2 border-amber-200 pt-3"
        >
            <h2
                className="m-3 text-2xl"
            >
                TODO List with Custom useList
            </h2>

            <ul>
                {
                    todoList.map(todo => (
                        <ToDoRow
                            key={todo.id}
                            isCompleted={todo.isCompleted}
                            title={todo.title}
                            onDelete={() => onDeleteClick(todo.id)}
                            onEdit={() => onEditClick(todo.id)}
                            onToggle={() => onToggleClick(todo.id)}
                        />
                    ))
                }
                <AddNewItem
                    onAdd={onAddNewItem}
                    title={
                        editID ? todoList.find(todo => todo.id === editID)?.title : undefined
                    }
                />
            </ul>
        </div>
    );
};
export default ReducerList;
