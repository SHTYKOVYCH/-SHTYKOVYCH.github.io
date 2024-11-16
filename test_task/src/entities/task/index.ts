import { Task } from './model';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'Tasks',
    initialState: [] as Task[],
    reducers: {
        addTask: (_, action: PayloadAction<Task>) => {
            const state = selectTasks();

            const newTasks = state.concat(action.payload);
            localStorage.setItem('Tasks', JSON.stringify(newTasks));

            return newTasks;
        },
        editTask: (_, action: PayloadAction<Task>) => {
            const state = selectTasks();

            const index = state.findIndex((task) => task.id === action.payload.id);

            state[index] = action.payload;

            localStorage.setItem('Tasks', JSON.stringify(state));

            return state;
        },
        deleteTask: (_, action: PayloadAction<string>) => {
            const state = selectTasks();

            const newTasks = state.filter((task) => task.id !== action.payload);
            localStorage.setItem('Tasks', JSON.stringify(newTasks));
            return newTasks;
        }
    }
});

export const {
    actions: { addTask, deleteTask, editTask },
    reducer: tasksReducer
} = tasksSlice;

export const selectTasks = () => JSON.parse(localStorage.getItem('Tasks') || '[]') as Task[];

export { default as Task } from './ui';
