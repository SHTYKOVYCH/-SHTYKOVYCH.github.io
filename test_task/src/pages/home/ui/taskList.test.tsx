import { Provider } from 'react-redux';

import { selectTasks } from '@entities';

import TaskList from './taskList';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'src/app/store';
import { afterEach, describe, expect, it } from 'vitest';

describe('taskList component', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('renders list', () => {
        localStorage.setItem(
            'Tasks',
            JSON.stringify([
                { id: '1', title: 'test', completed: null },
                { id: '2', title: 'test2', completed: null }
            ])
        );

        render(
            <Provider store={createStore()}>
                <TaskList></TaskList>
            </Provider>
        );

        expect(screen.queryByText('test')).toBeInTheDocument();
        expect(screen.queryByText('test2')).toBeInTheDocument();
    });

    it('tests buttons', async () => {
        localStorage.setItem(
            'Tasks',
            JSON.stringify([
                { id: '1', title: 'test', completed: null },
                { id: '2', title: 'test2', completed: Date.now().toString() }
            ])
        );

        const user = userEvent.setup();

        render(
            <Provider store={createStore()}>
                <TaskList></TaskList>
            </Provider>
        );

        expect(screen.queryByText('Hide completed')).toBeInTheDocument();
        expect(screen.queryByText('Clear Completed')).toBeInTheDocument();

        await user.click(screen.getByText('Hide completed'));

        expect(screen.queryByText('test2')).not.toBeInTheDocument();

        expect(screen.queryByText('Show all')).toBeInTheDocument();

        await user.click(screen.getByText('Clear Completed'));

        expect(selectTasks().length).toEqual(1);
    });
});
