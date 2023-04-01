import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from "./Actions";
import { INITIAL_STORE } from "./Store";
import uniqid from 'uniqid';

export const reducer = (state = INITIAL_STORE, action) => {
    switch(action.type) {
        case ADD_EXPENSE:
            const newEpense = {...action.data, id: uniqid()};
            return [...state, newEpense];
        case DELETE_EXPENSE:
            const deleteState = state.filter((item) => item.id !== action.id);
            return deleteState;
        case UPDATE_EXPENSE:
            const newState = state.map((item) => {
                return item.id == action.id ? action.item : item;
            })
            return newState;
        default:
            return state;
    }
}