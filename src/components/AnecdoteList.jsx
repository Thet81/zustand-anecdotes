// AnecdoteList.jsx
import {useAnecdotes,useAnecdoteActions} from '../store'

const AnecdoteList = ()=> {
	const anecdotes = useAnecdotes()
	const {voteFor} = useAnecdoteActions()
	const sortedAnecdotes = anecdotes.toSorted((a,b)=> (b.votes - a.votes))
	const vote = id => {
		voteFor(id)
	}
	return (
		<div>
			{sortedAnecdotes.map(anecdote => (
		        <div key={anecdote.id}>
		          <div>{anecdote.content}</div>
		          <div>
		            has {anecdote.votes}
		            <button onClick={() => vote(anecdote.id)}>vote</button>
		          </div>
		        </div>
	      	))}
		</div>
	)
}

export default AnecdoteList