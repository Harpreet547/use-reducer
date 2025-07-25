import React, { useEffect } from "react";
import { useObject } from "./useObject";

const ReducerObject: React.FC = () => {
    const {
        addObject,
        updateKeyInObject,
        // getObject,
        getKeyValue
    } = useObject({});

    useEffect(() => {
        addObject(
            "FormObjectID",
            {
                isCompleted: false,
                title: "Initial Title"
            }
        );
    }, [addObject]); // addObject should never change, so we can safely use it in the dependency array, Reducer will also check if the object already exists

    return (
        <div
            className="m-3 border-t-2 border-amber-200 pt-3"
        >
            <h2
                className="m-3 text-2xl"
            >
                Reducer Custom useObject
            </h2>

            <div
                className="flex items-center justify-center gap-2 p-2"
            >
                <input type="checkbox" checked={getKeyValue("FormObjectID", "isCompleted") as boolean} onChange={() => updateKeyInObject("FormObjectID", "isCompleted", !getKeyValue("FormObjectID", "isCompleted"))} />

                <input
                    type="text"
                    placeholder="Add new item"
                    value={getKeyValue("FormObjectID", "title") as string}
                    onChange={(e) => updateKeyInObject("FormObjectID", "title", e.target.value)}
                    className="border p-1 rounded"
                />
            </div>
        </div>
    );
};
export default ReducerObject;
