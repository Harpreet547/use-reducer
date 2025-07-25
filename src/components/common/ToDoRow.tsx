import React from "react";

interface ToDoRowProps {
    isCompleted: boolean;
    title: string;
    onDelete: () => void;
    onEdit: () => void;
    onToggle: () => void;
}
const ToDoRow: React.FC<ToDoRowProps> = (props: ToDoRowProps) => {
    const {
        isCompleted,
        title,
        onDelete,
        onEdit,
        onToggle
    } = props;

    return (
        <li
            className="flex items-center justify-center gap-2 p-2"
        >
            <input type="checkbox" checked={isCompleted} onChange={onToggle} />
            <span>{ title }</span>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </li>
    );
};
export default ToDoRow;