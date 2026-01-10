import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryFilter from './components/CountryFilter'
import Countries from './components/Countries'
import './App.css'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll().then(countries => {
      setAllCountries(countries)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = filter.length > 0
    ? allCountries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : []

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App