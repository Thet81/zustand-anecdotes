
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set,get) => ({
  anecdotes: [],
  filter : '',
  actions: {
    // voteFor : id => set(state => ({anecdotes : state.anecdotes.map(anecdote => anecdote.id === id ? {...anecdote, votes : anecdote.votes + 1} : anecdote)})),
    voteFor : async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = {...anecdote, votes : anecdote.votes + 1}
      const newAnecdote = await anecdoteService.update(id,updatedAnecdote)
      set(state => ({anecdotes : state.anecdotes.map(a => a.id === id ? newAnecdote : a)}))
    },
    addAnecdote : async content => {
      const newAnecdote = await anecdoteService.createNew()
      set(state => ({anecdotes : state.anecdotes.concat(newAnecdote)}))
    },
    setFilter : value => set(()=> ({filter : value})),
    initialize : async ()=> {
      const anecdotes = await anecdoteService.getAll()
      set(()=> ({anecdotes}))
    }
  },
}))

// export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
// export const useFilter = ()=> useAnecdoteStore(state=> state.filter)
export const useAnecdotes = ()=> {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  if (!filter){
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
