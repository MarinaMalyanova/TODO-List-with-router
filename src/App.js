import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [value, setValue] = useState('');
	const [isSorting, setIsSorting] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3004/todoList')
			.then((rawResponse) => rawResponse.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	// const onChange = ({ target }) => {
	// 	setValue(target.value);
	// 	const filter = todos.filter((todo) => todo.text.includes(target.value));
	// 	setTodos(filter);
	// };

	// const onSubmit = (event) => {
	// 	event.preventDefault();
	// 	setValue('');
	// 	console.log({ value });
	// };

	// const requestAddTask = async () => {
	// 	let newTask = {};

	// 	setIsCreating(true);
	// 	const response = await fetch('http://localhost:3004/todoList', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	// 		body: JSON.stringify({
	// 			text: value,
	// 			complete: false,
	// 		}),
	// 	});
	// 	const json = await response.json();
	// 	console.log('Задача добавлена. Ответ сервера:', json);
	// 	newTask = { text: json.text, id: json.id };
	// 	console.log(newTask);

	// 	fetch('http://localhost:3004/todoList')
	// 		.then((rawResponce) => rawResponce.json())
	// 		.then((data) => {
	// 			setTodos(data);
	// 			console.log('data', data);
	// 		})
	// 		.finally(() => {
	// 			setIsSearch(false);
	// 			setIsCreating(false);
	// 		});
	// 	console.log(todos);
	// };
	// const sortTasks = () => {
	// 	setIsSorting(true);
	// 	fetch('http://localhost:3004/todoList?_sort=text')
	// 		.then((rawResponce) => rawResponce.json())
	// 		.then((sortArray) => {
	// 			console.log('Задачи отсортированы. Ответ сервера:', sortArray);
	// 			setIsSorted(true);
	// 			setTodos(sortArray);
	// 		})
	// 		.finally(() => {
	// 			setIsSorting(false);
	// 			setIsSearch(false);
	// 		});
	// };

	return (
		<div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, text }) => (
					<div className={styles.list} key={id}>
						<span className={styles.id}></span>{' '}
						<Link to={`/todo/${id}`} className={styles.todo}>
							<span>{text}</span>
						</Link>
					</div>
				))
			)}
		</div>
	);
};

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [value, setValue] = useState('555');
	const [isSearch, setIsSearch] = useState(false);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		console.log(params.id);
		fetch(`http://localhost:3004/todoList/${params.id}`)
			.then((rawResponse) => rawResponse.json())
			.then((loadedTodos) => {
				console.log(loadedTodos);
				setTodos(loadedTodos);
				console.log(todos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const requestUpdateTask = () => {
		setIsUpdating(true);
		fetch(`http://localhost:3004/todoList/${params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				text: value,
				complete: false,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Задача обновлена. Ответ сервера:', responce);
				setTodos(
					Object.entries(todos).map((todo) => {
						if (todo.id === params.id) {
							todo.text = value;
						}
						return todo;
					}),
				);
			})
			.finally(() => {
				setIsSearch(false);
				setIsUpdating(false);
			});
	};
	const requestDeleteTask = (event) => {
		const id = event.target.id;
		console.log(id);
		setIsDeleting(true);
		fetch(`http://localhost:3004/todoList/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Задача удалена. Ответ сервера:', responce);
				setTodos(Object.entries(todos).filter((todo) => todo.id !== id));
				navigate(-1);
			})
			.finally(() => {
				setIsSearch(false);
				setIsDeleting(false);
			});
	};
	return (
		<>
			<h2>Редактирование задачи</h2>
			<div className={styles.list} key={todos.id} id={todos.id}>
				<button onClick={() => navigate(-1)}>Назад</button>
				<a href="/" className={styles.todo}>
					<span>{todos.text}</span>
				</a>
				<button id={todos.id} disabled={isUpdating} onClick={requestUpdateTask}>
					Изменить
				</button>
				<button id={todos.id} disabled={isDeleting} onClick={requestDeleteTask}>
					Удалить
				</button>
			</div>
		</>
	);
};

function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [value, setValue] = useState('');
	const [isSorting, setIsSorting] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [isSearch, setIsSearch] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3004/todoList')
			.then((rawResponse) => rawResponse.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const onChange = ({ target }) => {
		setValue(target.value);
		console.log(todos);
		const filter = todos.filter((todo) => todo.text.includes(target.value));
		setTodos(filter);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValue('');
		console.log({ value });
	};

	const requestAddTask = async () => {
		let newTask = {};

		setIsCreating(true);
		const response = await fetch('http://localhost:3004/todoList', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				text: value,
				complete: false,
			}),
		});
		const json = await response.json();
		console.log('Задача добавлена. Ответ сервера:', json);
		newTask = { text: json.text, id: json.id };
		console.log(newTask);

		// const copyTodos = [...todos];
		// copyTodos.push(newTask);
		// setTodos(copyTodos);

		fetch('http://localhost:3004/todoList')
			.then((rawResponce) => rawResponce.json())
			.then((data) => {
				// setTodos(data);
				setTodos([...todos, newTask]);
				console.log(todos);
				console.log('data', data);
			})
			.finally(() => {
				setIsSearch(false);
				setIsCreating(false);
			});
	};
	const sortTasks = () => {
		setIsSorting(true);
		fetch('http://localhost:3004/todoList?_sort=text')
			.then((rawResponce) => rawResponce.json())
			.then((sortArray) => {
				console.log('Задачи отсортированы. Ответ сервера:', sortArray);
				setIsSorted(true);
				setTodos(sortArray);
			})
			.finally(() => {
				setIsSorting(false);
				setIsSearch(false);
			});
	};
	return (
		<div className={styles.app}>
			<h1>TODO List</h1>
			<form onSubmit={onSubmit} className={styles.todoForm}>
				<input
					type="text"
					name="text"
					value={value}
					className={styles.todoInput}
					placeholder="Введите задачу"
					onChange={onChange}
				></input>
				<button disabled={isCreating} onClick={requestAddTask}>
					Добавить задачу
				</button>
			</form>
			<div className={styles.buttons}>
				<button disabled={isSorting} onClick={sortTasks}>
					Сортировать задачи по алфавиту
				</button>
			</div>
			<Routes>
				<Route path="/" element={<Todos />} />
				<Route path="/todo/:id" element={<Todo />} />
			</Routes>
		</div>
	);
}

export default App;
