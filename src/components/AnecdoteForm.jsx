// AnecdoteForm.jsx
import {useAnecdoteActions} from '../store'

const AnecdoteForm = ()=> {
	const {addAnecdote} = useAnecdoteActions();

	const handleSubmit = e => {
		e.preventDefault()
		const anecdote = e.target.anecdote.value;
		addAnecdote(anecdote)
		e.target.reset()
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<input name="anecdote"/>
				<button type="add">add</button>
			</form>
		</div>
	)
}

export default AnecdoteForm;