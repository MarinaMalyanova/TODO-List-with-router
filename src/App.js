import { Todos, Todo, ControlPanel, NotFound } from './components';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api';
import { addTodoInTodos, findTodo, setTodoInTodos, removeTodoInTodos } from './utils';
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import styles from './app.module.css';
import { NEW_TODO_ID } from './constants';

function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
	const params = useParams();
	const todoParamsId = Number(params.id);

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	const onTodoSave = (todoId) => {
		const { title } = findTodo(todos, todoId) || {};
		console.log(todoId);

		if (params.todoId === NEW_TODO_ID) {
			createTodo({ title, completed: false }).then((todo) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, todo);
				setTodos(updatedTodos);
			});
		} else {
			updateTodo({ id: todoId, title }).then(() => {
				setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }));
			});
		}
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};

	const onTodoComplitedChange = (id, newComplited) => {
		updateTodo({ id, completed: newComplited }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newComplited }));
		});
	};

	// const onTodoRemove = (id) => {
	// 	deleteTodo(params.id).then(() => {
	// 		setTodos(removeTodoInTodos(todos, id));
	// 	});
	// };

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting)
			.then((loadedData) => setTodos(loadedData.reverse()))
			.finally(() => setIsLoading(false));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
				onSearch={setSearchPhrase}
				onSorting={setIsAlphabetSorting}
			/>

			<Routes>
				<Route path="/" element={<Todos todos={todos} isLoading={isLoading} />} />
				<Route
					path="/todo/:id"
					element={
						<Todo
							todos={todos}
							onEdit={() => onTodoEdit(todoParamsId)}
							onTitleChange={(newTitle) =>
								onTodoTitleChange(todoParamsId, newTitle)
							}
							onCompletedChange={(newComplited) =>
								onTodoComplitedChange(todoParamsId, newComplited)
							}
							onSave={() => onTodoSave(todoParamsId)}
							// onRemove={() => onTodoRemove(params.id)}
						/>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
