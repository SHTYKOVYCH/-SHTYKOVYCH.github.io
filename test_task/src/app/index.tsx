import { memo } from 'react';

import Wrapper from './ui/wrapper';
import { WithStore } from './providers';

import './styles.css';
import 'antd/dist/reset.css';

import { Home } from '@pages';

export const App = memo(() => {
    return (
        <WithStore>
            <Wrapper>
                <Home />
            </Wrapper>
        </WithStore>
    );
});
