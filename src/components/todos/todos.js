import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './todos.module.css';
import { Todo } from '../todo/todo';

export const Todos = ({ todos, searchPhrase, isAlphabetSorting, isLoading }) => {
	return (
		<div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title, completed, isEditing = false }) => (
					<div className={styles.todos} key={id} id={id}>
						{/* <Todo
							isEditing={isEditing}
							completed={completed}
							id={id}
							title={title}
						/> */}
						<Link to={`/todo/${id}`}>{title}</Link>
					</div>
				))
			)}
		</div>
	);
};
