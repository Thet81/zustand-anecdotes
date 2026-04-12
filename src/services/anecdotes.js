// anecdotes.js
const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async ()=> {
	const response = await fetch(baseUrl)
	if (!response.ok) {
		throw new Error ("Failed to fetch anecdotes!")
	}
	return await response.json()
}

const createNew = async content => {
	const response = await fetch(baseUrl,{
		method : 'POST',
		headers : {
			'Content-type' : 'application/josn'
		},
		body : JSON.stringify({content, votes : 0})
	})

	if (!response.ok) {
		throw new Error("Failed to create a new anecdote")
	}

	return await response.json()
}

const update = async (id,content)=> {
	const response = await fetch(`${baseUrl}/${id}`,{
		method : 'PUT',
		headers : {
			'Content-type' : 'application/json'
		},
		body : JSON.stringify(content)
	})

	if (!response.ok) {
		throw new Error("Failed to update the anecdote!")
	}
	return await response.json()
}

export default {
	getAll,
	createNew,
	update
}