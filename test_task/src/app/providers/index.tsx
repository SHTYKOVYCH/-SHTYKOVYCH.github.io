import { Provider } from 'react-redux';

import { store } from '../store';

export const WithStore = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;
