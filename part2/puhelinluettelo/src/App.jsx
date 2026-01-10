import { useState, useEffect } from 'react'

import personsService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person, onDelete }) => (
  <li>
    {person.name} {person.number} 
    <button onClick={onDelete}>delete</button>
  </li>
)

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map(person => 
      <Person 
        key={person.id} 
        person={person} 
        onDelete={() => onDelete(person.id, person.name)}
      />
    )}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addNumber = (event) => {
    event.preventDefault()
    const alreadyAddedPerson = persons.find(person => person.name === newName)

    if (persons.find(person => person.name === newName)) {
      window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero?`)
      const updatedPerson = { ...alreadyAddedPerson, number: newNumber}

      personsService
        .update(alreadyAddedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== alreadyAddedPerson.id ? person : returnedPerson))
          setNewName("")
          setNewNumber("")

          setNotificationType('success')
          setNotification(`Henkilön ${returnedPerson.name} numero päivitetty`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationType('error')
          setNotification(`Henkilö ${alreadyAddedPerson.name} on jo poistettu palvelimelta`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== alreadyAddedPerson.id))
        })

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setNotificationType('success')
        setNotification(`Lisättiin ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deleteNumber = (id, name) => {
    console.log('delete', id)
    if (window.confirm(`Poista ${name} ?`)) {
      personsService
        .removeNumber(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationType('success')
          setNotification(`Poistettiin ${name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} type={notificationType} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDelete={deleteNumber} />
    </div>
  )

}

export default App