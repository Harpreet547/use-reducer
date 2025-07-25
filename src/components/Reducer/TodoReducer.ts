
interface TodoItem {
    id: string;
    title: string;
    isCompleted: boolean;
}

export const TodoActionTypes = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    TOGGLE: 'TOGGLE',
    EDIT: 'EDIT'
} as const;
type TodoActionTypes = typeof TodoActionTypes[keyof typeof TodoActionTypes];

export interface TodoAction {
    type: TodoActionTypes;
    payload?: TodoItem | string;
}

export const TodoReducer = (state: TodoItem[] = [], action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.ADD:
            return [...state, action.payload as TodoItem];
        case TodoActionTypes.DELETE:
            return state.filter(todo => todo.id !== action.payload);
        case TodoActionTypes.TOGGLE:
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );
        case TodoActionTypes.EDIT:
            return state.map(todo =>
                todo.id === (action.payload as TodoItem).id ? { ...todo, title: (action.payload as TodoItem).title } : todo
            );
        default:
            return state;
    }
};