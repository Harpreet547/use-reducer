import React, { useEffect } from "react";

interface AddNewItemProps {
    onAdd: (title: string) => void;
    title?: string; // Optional prop for pre-filling the input
}
const AddNewItem: React.FC<AddNewItemProps> = (props: AddNewItemProps) => {
    const {
        onAdd,
        title
    } = props;

    const [newItemTitle, setNewItemTitle] = React.useState("");

    useEffect(() => {
        if (title) {
            setNewItemTitle(title);
        }
    }, [title]);

    const handleAddClick = () => {
        onAdd(newItemTitle);
        setNewItemTitle("");
    };
    return (
        <li>
            <input
                type="text"
                placeholder="Add new item"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="border p-1 rounded"
            />
            <button onClick={handleAddClick}>Add</button>
        </li>
    );
};
export default AddNewItem;