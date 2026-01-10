import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const languages = country.languages ? Object.values(country.languages) : []
  const capital = country.capital?.[0]
  const [lat, lon] = country.capitalInfo?.latlng || []

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital?.join(', ')}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150"
      />
      {capital && lat && lon && <Weather capital={capital} lat={lat} lon={lon} />}
    </div>
  )
}

const CountryList = ({ countries, setFilter }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => setFilter(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

const Countries = ({ countries, setFilter }) => {
  if (countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return <CountryList countries={countries} setFilter={setFilter} />
}

export default Countries