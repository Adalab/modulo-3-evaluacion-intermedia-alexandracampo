// Fichero src/components/App.js
import '../styles/App.css';
import data from '../data/data.json';
import { useState } from 'react';


function App() {

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');


  const renderList = () => {
    return data

      .filter((eachCharacter) => {
        return eachCharacter.quote.toLowerCase().includes(search.toLowerCase())
      })
      .filter((eachCharacter) => {
        return eachCharacter.character.includes(select)
      })
      .map((eachCharacter, i) => (
        <li key={i}>
          <p>{eachCharacter.quote}</p>
          <p>{eachCharacter.character}</p>
          <hr></hr>
        </li>
      ))
  }

  const handleFilterInput = (ev) => {
    setSearch(ev.target.value);
  }

  const handleFilterCharacter = (ev) => {
    setSelect(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <div>
      <h1>Frases de friends</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="quote">Filtrar por frase:</label>
        <input onChange={handleFilterInput} type="text" name="quote" />

        <label htmlFor="character">Filtrar por personaje:</label>
        <select name="character" onChange={handleFilterCharacter}>
          <option value="">Todos</option>
          <option>Ross</option>
          <option>Monica</option>
          <option>Joey</option>
          <option>Phoebe</option>
          <option>Chandler</option>
          <option>Rachel</option>
        </select>
      </form>

      <ul>{renderList()}</ul>
    </div>
  );
}

export default App;
