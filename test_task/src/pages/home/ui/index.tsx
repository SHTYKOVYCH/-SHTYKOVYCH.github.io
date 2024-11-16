import { memo } from 'react';

import TaskForm from './form';
import TaskList from './taskList';

import styles from './styles.module.scss';

export default memo(() => {
    return (
        <div className={styles.homePageContainer}>
            <h2 className={styles.homePageHeader}>Todos</h2>
            <TaskForm />
            <TaskList />
        </div>
    );
});
