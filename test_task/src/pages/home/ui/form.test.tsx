import { Provider } from 'react-redux';

import { selectTasks } from '@entities';

import Form from './form';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'src/app/store';
import { describe, expect, it } from 'vitest';

describe('form component', () => {
    it('creates task', async () => {
        const user = userEvent.setup();

        render(
            <Provider store={createStore()}>
                <Form></Form>
            </Provider>
        );

        expect(document.querySelector('input')).toBeInTheDocument();

        await user.click(document.querySelector('input')!);
        await user.keyboard('test{enter}');

        expect(selectTasks()[0].title).toEqual('test');
    });
});
