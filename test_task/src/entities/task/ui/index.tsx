import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Task } from '../model';
import { editTask } from '..';

import styles from './styles.module.scss';

import { EMPTY_TASK_ERROR } from '@shared/constants';

export interface TaskProps {
    task: Task;
}

export default memo<TaskProps>(({ task }) => {
    const dispatch = useDispatch();

    const [form] = useForm<{ input: string }>();

    const [editMode, setEditMode] = useState<boolean>(false);

    const onComplete = useCallback(() => {
        dispatch(
            editTask({
                id: task.id,
                title: task.title,
                completed: Date.now().toString()
            })
        );
    }, [dispatch, task.id, task.title]);

    const onEdit = useCallback(
        (val: { input: string }) => {
            dispatch(
                editTask({
                    id: task.id,
                    title: val.input,
                    completed: task.completed
                })
            );
            form.resetFields();
            setEditMode(false);
        },
        [dispatch, form, task.completed, task.id]
    );

    const onClick = useCallback(() => {
        setEditMode(true);
    }, []);

    const onBlur = useCallback(() => {
        setEditMode(false);
    }, []);

    return (
        <div className={styles.task}>
            <Checkbox checked={!!task.completed} onChange={onComplete} />
            {!editMode ? (
                <div onClick={onClick}>{task.title}</div>
            ) : (
                <Form form={form} onFinish={onEdit} className={styles.taskForm}>
                    <Form.Item
                        initialValue={task.title}
                        name='input'
                        rules={[{ required: true, message: EMPTY_TASK_ERROR }]}
                    >
                        <Input data-testid='task-input' autoFocus size='small' onBlur={onBlur} />
                    </Form.Item>
                </Form>
            )}
        </div>
    );
});
