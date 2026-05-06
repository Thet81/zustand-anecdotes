// store.test.js

import {beforeEach, describe, expect, it , vi} from 'vitest'
// import anecdoteStore to use getState(), setState(), ...etc methods  on it
import anecdoteStore,{useAnecdotes,useAnecdoteActions} from './store'
import { renderHook, act } from '@testing-library/react'
import anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes',()=> ({
	default : {
		getAll : vi.fn(),
		createNew : vi.fn(),
		update : vi.fn()
	}
}))

beforeEach(()=> {
	anecdoteStore.setState({anecdotes : [], filter : "", notification : ""})
	vi.clearAllMocks()
})

describe('use anecdotes action',()=> {

	it ('initialize loads anecdotes from the server',async ()=> {
		const mockAnecdotes = [{id : 1 , content : 'some anecdote for testing', votes : 0}]
		anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

		const {result} = renderHook(()=> useAnecdoteActions())

		await act(async ()=> {
			await result.current.initialize()
		})

		const {result : anecdotesValue} = renderHook(()=> useAnecdotes())
		expect(anecdotesValue.current).toEqual(mockAnecdotes)
	})

	it('the anecdotes in the store are sorted by votes' ,async()=> {
		const mockAnecdotes = [
			{id : 1 , content : 'some anecdote for testing', votes : 0},
			{id : 2, content : 'top anecdote' , votes : 100}
		]
		anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
		const {result} = renderHook(()=> useAnecdoteActions())

		await act(async()=> {
			await result.current.initialize()
		})

		const {result : anecdotesValue} = renderHook(()=> useAnecdotes())

		expect(anecdotesValue.current[0]).toBe(mockAnecdotes[1])
		
	})
})
// beforeEach(()=> {
// 	anecdoteStore.setState({anecdotes : []});
// })

// describe("anecdoteStore",()=> {
// 	it("initial state of anecdote is empty",()=> {
// 		expect(anecdoteStore.getState().anecdotes.length).toBe(0)
// 	})
// 	it('useCounter returns initial value of 0', () => {
//     const { result } = renderHook(() => useAnecdotes())
//     console.log('render hook result is ', result)
//     expect(result.current.length).toBe(0)
//   })
// })