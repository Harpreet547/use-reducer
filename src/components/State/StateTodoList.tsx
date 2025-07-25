import React, { useCallback, useState } from 'react';
import ToDoRow from '../common/ToDoRow';
import AddNewItem from '../common/AddNewItem';


interface TodoItem {
    id: string;
    title: string;
    isCompleted: boolean;
}

const StateTodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [editID, setEditID] = React.useState<string | null>(null);


    const onDelete = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const onEdit = useCallback((id: string) => {
        setEditID(id);
    }, []);

    const onToggle = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    }, []);

    const onAddNewItem = useCallback((title: string) => {
        if (editID) {
            setTodos(prevTodos => prevTodos.map(todo => todo.id === editID ? { ...todo, title } : todo));
            setEditID(null);
        } else {
            setTodos(prevTodos => [...prevTodos, { id: Date.now().toString(), title, isCompleted: false }]);
        }
    }, [editID]);

    return (
        <div
            className="m-3 border-t-2 border-amber-200 pt-3"
        >
            <h2
                className="m-3 text-2xl"
            >
                TODO List With useState
            </h2>
            <ul>
                {
                    todos.map(todo => (
                        <ToDoRow
                            key={todo.id}
                            title={todo.title}
                            isCompleted={todo.isCompleted}
                            onDelete={() => onDelete(todo.id)}
                            onEdit={() => onEdit(todo.id)}
                            onToggle={() => onToggle(todo.id)}
                        />
                    ))
                }
                
                <AddNewItem
                    onAdd={onAddNewItem}
                    title={
                        editID ? todos.find(todo => todo.id === editID)?.title : undefined
                    }
                />
            </ul>
        </div>
    );
};
export default StateTodoList;