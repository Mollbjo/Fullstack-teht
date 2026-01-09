import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const highestVotes = Math.max(...votes)

  const leastVotes = Math.min(...votes)

  const mostIndices = votes.reduce ((indices, vote, index ) => {
    if (vote === highestVotes) {
      indices.push (index)
    }
    return indices
  }, [])

  const leastIndices = votes.reduce ((indices, vote, index ) => {
    if (vote === leastVotes) {
      indices.push (index)
    }
    return indices
  }, [])

  const VoteAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const DislikeAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] -= 1
    setVotes(votesCopy)
  }

  const showRandom = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>ääniä {votes[selected]} ääntä</div>
      <button onClick={showRandom}>Satunnainen anekdootti</button>
      <button onClick={VoteAnecdote}>Äänestä</button>
      <button onClick={DislikeAnecdote}>Äänestä vastaan</button>

    <h1>Eniten ääniä saaneet anekdootti</h1>
    <div>{mostIndices.map(index => (
      <div key={index} style={{fontWeight: 'bold', marginBottom: "1rem"}}>{anecdotes[index]}</div>
    ))}</div>
    <div>ääniä: {highestVotes} ääntä</div>

    <h2>Vähiten ääniä saaneet anekdootit</h2>
    <div>{leastIndices.map(index => (
      <div key={index} style={{fontWeight: 'bold', marginBottom: "1rem"}}>{anecdotes[index]}</div>
    ))}</div>
    <div>ääniä: {leastVotes} ääntä</div>



    </div>
  )
}

export default App