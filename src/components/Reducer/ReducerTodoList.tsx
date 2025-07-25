import React, { useCallback } from "react";
import ToDoRow from "../common/ToDoRow";
import AddNewItem from "../common/AddNewItem";
import { TodoReducer, TodoActionTypes } from "./TodoReducer";

const ReducerTodoList: React.FC = () => {
    const [state, dispatch] = React.useReducer(TodoReducer, []);

    const [editID, setEditID] = React.useState<string | null>(null);

    const OnDeleteClick = useCallback((id: string) => {
        dispatch({ type: TodoActionTypes.DELETE, payload: id });
    }, []);

    const OnEditClick = useCallback((id: string) => {
        setEditID(id);
    }, []);

    const onToggleClick = useCallback((id: string) => {
        dispatch({ type: TodoActionTypes.TOGGLE, payload: id });
    }, []);

    const onAddNewItem = useCallback((title: string) => {
        if(editID) {
            dispatch({ type: TodoActionTypes.EDIT, payload: { id: editID, title, isCompleted: false } });
            setEditID(null);
        } else {
            dispatch({ type: TodoActionTypes.ADD, payload: { id: Date.now().toString(), title, isCompleted: false } });
        }
    }, [editID]);

    return (
        <div
            className="m-3 border-t-2 border-amber-200 pt-3"
        >
            <h2
                className="m-3 text-2xl"
            >
                TODO List with useReducer
            </h2>
            <ul>
                {
                    state.map(todo => (
                        <ToDoRow
                            key={todo.id}
                            isCompleted={todo.isCompleted}
                            title={todo.title}
                            onDelete={() => OnDeleteClick(todo.id)}
                            onEdit={() => OnEditClick(todo.id)}
                            onToggle={() => onToggleClick(todo.id)}
                        />
                    ))
                }
                <AddNewItem
                    onAdd={onAddNewItem}
                    title={
                        editID ? state.find(todo => todo.id === editID)?.title : undefined
                    }
                />
            </ul>
        </div>
    );
};
export default ReducerTodoList;
