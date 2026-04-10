// Filter.jsx
import {useAnecdoteActions} from '../store'

const Filter = ()=> {
	const {setFilter} = useAnecdoteActions()
	const margin = {
		marginBottom : 10
	}
	const handleChange = e => {
		setFilter(e.target.value)
	}
	return (
		<div style={margin}>
			filter <input onChange={handleChange}/>
		</div>
	)
}

export default Filter