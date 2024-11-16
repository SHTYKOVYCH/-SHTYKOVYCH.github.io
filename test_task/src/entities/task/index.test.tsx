import { Provider } from 'react-redux';

import { Task } from '.';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'src/app/store';
import { afterEach, describe, expect, it } from 'vitest';

describe('task component', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('renders component', () => {
        localStorage.setItem('Tasks', JSON.stringify([{ id: '1', title: 'test', completed: null }]));

        render(
            <Provider store={createStore()}>
                <Task
                    task={{
                        id: '1',
                        title: 'test',
                        completed: null
                    }}
                />
            </Provider>
        );

        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('exit on blur', async () => {
        const user = userEvent.setup();
        localStorage.setItem('Tasks', JSON.stringify([{ id: '1', title: 'test', completed: null }]));

        render(
            <Provider store={createStore()}>
                {(() => {
                    const task = JSON.parse(localStorage.getItem('Tasks') || '[]')[0];

                    return <Task task={task}></Task>;
                })()}
            </Provider>
        );

        await user.click(screen.getByText('test'));

        expect(screen.queryByTestId('task-input')).toBeInTheDocument();

        await user.click(document.body);

        expect(screen.queryByTestId('task-input')).not.toBeInTheDocument();
    });

    it('edit task', async () => {
        const user = userEvent.setup();
        localStorage.setItem('Tasks', JSON.stringify([{ id: '1', title: 'test', completed: null }]));

        render(
            <Provider store={createStore()}>
                {(() => {
                    const task = JSON.parse(localStorage.getItem('Tasks') || '[]')[0];

                    return <Task task={task}></Task>;
                })()}
            </Provider>
        );

        await user.click(screen.getByText('test'));

        const input: HTMLInputElement = screen.getByTestId('task-input');

        expect(input.value).toEqual('test');

        await user.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}test2{Enter}');

        expect(screen.queryByTestId('task-input')).not.toBeInTheDocument();

        expect(JSON.parse(localStorage.getItem('Tasks') || '[]')).toEqual([
            { id: '1', title: 'test2', completed: null }
        ]);

        await user.click(screen.getByRole('checkbox'));

        expect(JSON.parse(localStorage.getItem('Tasks') || '[]')![0].completed).not.toBeNull();
    });
});
