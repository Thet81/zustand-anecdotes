// AnecdoteList.jsx
import {useAnecdotes,useAnecdoteActions,} from '../store'

const AnecdoteList = ()=> {
	const margin = {
		marginBottom : 10
	}
	const anecdotes = useAnecdotes()
	const {voteFor,setNoti, clearNoti,deleteZeroVotes} = useAnecdoteActions()
	// const sortedAnecdotes = anecdotes.toSorted((a,b)=> (b.votes - a.votes))
	
	const vote = id => {
		voteFor(id)
		const anecdote = anecdotes.find(a => a.id === id)
		setNoti(`You have voted "${anecdote.content}"`)
		setTimeout(()=> {
			clearNoti()
		},5000)
	}

	const handleDeleteZeroVote = ()=> {
		deleteZeroVotes()
	}
	return (
		<div>
			{sortedAnecdotes.map(anecdote => (
		        <div key={anecdote.id} style={margin}>
		          <div>{anecdote.content}</div>
		          <div>
		            has {anecdote.votes}
		            <button onClick={() => vote(anecdote.id)}>vote</button>
		          </div>
		        </div>
	      	))}
	      	<div>
	      		<button onClick={handleDeleteZeroVote}>Delete zero vote</button>
	      	</div>
		</div>
	)
}

export default AnecdoteList