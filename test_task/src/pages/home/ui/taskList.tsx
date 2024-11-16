import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';

import { deleteTask, selectTasks, Task } from '@entities';

import cn from 'classnames';
import styles from './styles.module.scss';

export default memo(() => {
    const dispatch = useDispatch();

    const [hideCompleted, setHideCompleted] = useState(false);

    const toggleHidden = useCallback(() => {
        setHideCompleted((prev) => !prev);
    }, []);

    const tasks = useSelector(selectTasks);

    const completedExist = useMemo(() => tasks.some((task) => task.completed), [tasks]);

    const filteredTasks = useMemo(
        () => tasks.filter((task) => !hideCompleted || !task.completed),
        [hideCompleted, tasks]
    );

    const clearCompleted = useCallback(() => {
        tasks.forEach(({ id, completed }) => {
            if (completed) {
                dispatch(deleteTask(id));
            }
        });
        setHideCompleted(false);
    }, [dispatch, tasks]);

    return (
        <div className={styles.listContainer}>
            <div
                className={cn([
                    styles.listButtons,
                    {
                        [styles.hidden]: !completedExist
                    }
                ])}
            >
                <Button onClick={toggleHidden}>{hideCompleted ? 'Show all' : 'Hide completed'}</Button>
                <Button onClick={clearCompleted}>Clear Completed</Button>
            </div>
            <div className={styles.list}>
                {filteredTasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
});
