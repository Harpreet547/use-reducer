import { useCallback, useReducer } from "react";

const UseObjectActionTypes = {
    ADD_OBJECT: "ADD_OBJECT",
    UPDATE_KEY: "UPDATE_KEY",
} as const;
type UseObjectActionTypes = typeof UseObjectActionTypes[keyof typeof UseObjectActionTypes];

export const useObject = (initialState: Record<string, Record<string, unknown>>) => {
    const [state, dispatch] = useReducer(useObjectReducer, initialState);

    const addObject = useCallback((objectID: string, value: Record<string, unknown>) => {
        dispatch({
            type: UseObjectActionTypes.ADD_OBJECT,
            payload: {
                objectID,
                value
            }
        });
    }, []);

    const updateKeyInObject = useCallback((objectID: string, key: string, value: unknown) => {
        dispatch({
            type: UseObjectActionTypes.UPDATE_KEY,
            payload: {
                objectID,
                value: {
                    [key]: value,
                },
            },
        });
    }, []);

    const getKeyValue = useCallback((objectID: string, key: string) => {
        const object = state[objectID];
        if (!object) {
            return undefined; // or throw an error if the object does not exist
        }
        return object[key];
    }, [state]);

    const getObject = useCallback((objectID: string) => {
        return state[objectID];
    }, [state]);

    return {
        addObject,
        updateKeyInObject,
        getObject,
        getKeyValue
    };
};

interface UseObjectPayload {
    objectID: string;
    value: Record<string, unknown>;
}
const useObjectReducer = (state: Record<string, Record<string, unknown>> = {}, action: { type: UseObjectActionTypes; payload?: UseObjectPayload }) => {
    switch (action.type) {
        case UseObjectActionTypes.ADD_OBJECT:
            if (!action.payload) {
                throw new Error("Payload is required for ADD_OBJECT action");
            }
            if (state[action.payload.objectID]) {
                // We can throw and error or just return the state
                return state; // Object already exists, do not overwrite
            }
            return {
                ...state,
                [action.payload.objectID]: action.payload.value
            };
        case UseObjectActionTypes.UPDATE_KEY:
            if (!action.payload) {
                throw new Error("Payload is required for UPDATE_KEY action");
            }
            return {
                ...state,
                [action.payload.objectID]: {
                    ...state[action.payload.objectID] as Record<string, unknown>,
                    ...action.payload.value
                }
            };
        default:
            return state;
    }
};
