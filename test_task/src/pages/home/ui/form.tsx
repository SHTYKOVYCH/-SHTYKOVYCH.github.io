import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { addTask } from '@entities';

import styles from './styles.module.scss';

import { EMPTY_TASK_ERROR } from '@shared/constants';

export default memo(() => {
    const dispatch = useDispatch();

    const [form] = useForm<{
        input: string;
    }>();

    const onFinish = useCallback(
        (values: { input: string }) => {
            dispatch(
                addTask({
                    id: Date.now().toString(),
                    title: values.input,
                    completed: null
                })
            );
            form.resetFields();
        },
        [dispatch, form]
    );

    return (
        <Form className={styles.form} form={form} onFinish={onFinish}>
            <Form.Item name='input' rules={[{ required: true, message: EMPTY_TASK_ERROR }]}>
                <Input size='large' placeholder='Add a task' />
            </Form.Item>
            To edit a task, click on its title
        </Form>
    );
});
