import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './todo.module.css';
import { Button } from '../button/button';
import { createTodo, readTodos, updateTodo, deleteTodo } from '../../api';
import { addTodoInTodos, findTodo, setTodoInTodos, removeTodoInTodos } from '../../utils';
import { NEW_TODO_ID } from '../../constants';

export const Todo = ({
	id,
	todos,
	completed,
	isEditing,
	onEdit,
	onTitleChange,
	onCompletedChange,
	onSave,
	onRemove,
}) => {
	const [todo, setTodo] = useState();
	const params = useParams();
	const navigate = useNavigate();
	console.log('params.id', params.id);
	const { title } = findTodo(todos, Number(params.id)) || {};
	console.log(findTodo(todos, Number(params.id)));

	const onTodoRemove = (id) => {
		deleteTodo(params.id).then(() => {
			setTodo(removeTodoInTodos(todos, id));
		});
		navigate('/');
	};
	return (
		<div>
			<div className={styles.title}>
				<h3>Редактирование задачи</h3>
			</div>
			<div className={styles.todo}>
				<input
					type="checkbox"
					checked={completed}
					onChange={({ target }) => onCompletedChange(target.checked)}
				/>
				<div className={styles.todoTitle}>
					{isEditing ? (
						<input
							type="text"
							value={title}
							onChange={({ target }) => onTitleChange(target.value)}
						/>
					) : (
						<div onClick={onEdit}>{title}</div>
					)}
				</div>
				<div>
					{isEditing ? (
						<Button onClick={onSave}>✎</Button>
					) : (
						<Button onClick={onTodoRemove}>✗</Button>
					)}
				</div>
			</div>
		</div>
	);
};
