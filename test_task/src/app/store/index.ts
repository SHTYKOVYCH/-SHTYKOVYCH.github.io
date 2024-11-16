import { tasksReducer } from '@entities';

import { configureStore } from '@reduxjs/toolkit';

export const createStore = () =>
    configureStore({
        reducer: {
            tasks: tasksReducer
        }
    });

export const store = createStore();
