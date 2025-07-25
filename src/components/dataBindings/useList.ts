import { useCallback, useReducer } from "react";

export const useList = (initialState: Record<string, Record<string, ListType>[]> = {}) => {
    const [list, dispatch] = useReducer(useListReducer, initialState);

    const addList = useCallback((id: string, value: ListType) => {
        dispatch({
            type: UseListActionTypes.ADD_LIST,
            payload: { id, value }
        });
    }, []);

    const deleteAtIndex = useCallback((id: string, index: number) => {
        dispatch({
            type: UseListActionTypes.DELETE_AT_INDEX,
            payload: { id, index }
        });
    }, []);

    const updateAtIndex = useCallback((id: string, index: number, value: ListTypeElement) => {
        dispatch({
            type: UseListActionTypes.UPDATE_AT_INDEX,
            payload: { id, index, value }
        });
    }, []);

    const addElementInList = useCallback((id: string, value: ListTypeElement) => {
        dispatch({
            type: UseListActionTypes.ADD_ELEMENT_IN_LIST,
            payload: { id, value }
        });
    }, []);

    const getList = useCallback(<T,>(id: string) => {
        return (list[id] ?? []) as T[];
    }, [list]);

    return {
        addList,
        getList,
        deleteAtIndex,
        updateAtIndex,
        addElementInList
    };

};

const UseListActionTypes = {
    ADD_LIST: "ADD_LIST",
    ADD_ELEMENT_IN_LIST: "ADD_ELEMENT_IN_LIST",
    DELETE_AT_INDEX: "DELETE_AT_INDEX",
    UPDATE_AT_INDEX: "UPDATE_AT_INDEX"
} as const;
type UseListActionTypes = typeof UseListActionTypes[keyof typeof UseListActionTypes];

type ListTypeElement = Record<string, unknown> | string | number;
type ListType = ListTypeElement[];

interface UseListPayload {
    id: string;
    value?: ListType | ListTypeElement | number;
    index?: number;
}

const useListReducer = (state: Record<string, ListType> = {}, action: { type: UseListActionTypes; payload: UseListPayload }) => {
    switch (action.type) {
        case UseListActionTypes.ADD_LIST:
            if (!action.payload.value) {
                throw new Error("Payload.value is required for ADD action");
            }
            return {
                ...state,
                [action.payload.id]: action.payload.value as ListType
            };
        case UseListActionTypes.DELETE_AT_INDEX:
            if (action.payload.index === undefined) {
                throw new Error("Index is required for DELETE action");
            }
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].filter((_, i) => i !== action.payload.index)
            };
        case UseListActionTypes.UPDATE_AT_INDEX:
            if (!action.payload.index) {
                throw new Error("Index is required for UPDATE action");
            }
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].map((item, i) => i === action.payload.index ? action.payload.value as ListTypeElement : item)
            };
        case UseListActionTypes.ADD_ELEMENT_IN_LIST:
            if (action.payload.value === undefined) {
                throw new Error("Value is required for ADD_ELEMENT_IN_LIST action");
            }
            return {
                ...state,
                [action.payload.id]: [...(state[action.payload.id] ?? []), action.payload.value as ListTypeElement]
            };
        default:
            return state;
    }
};