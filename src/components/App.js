// Fichero src/components/App.js
import '../styles/App.css';
import data from '../data/data.json';
import { useState, useEffect } from 'react';


function App() {

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');
  const [data, setData] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const [newCharacter, setNewCharacter] = useState('');



  //UseEffect donde controlamos el fecth a la API
  useEffect(() => {

    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(response => response.json())
      .then(dataApi => {
        setData(dataApi);
      });

  }, []);


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
      .reverse();
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

  const handleInputNewQuote = (ev) => {
    setNewQuote(ev.target.value);
  }

  const handleInputNewCharacter = (ev) => {
    setNewCharacter(ev.target.value);
  }

  const handleAddQuote = (ev) => {
    //Validar que los inputs tengan contenido o no:
    if (newQuote && newCharacter) {
      data.push({
        "quote": newQuote,
        "character": newCharacter
      })
      setData([...data])
      setNewQuote('')
      setNewCharacter('')
    }
  }

  return (
    <div>
      <h1>Frases de friends</h1>
      <form onSubmit={handleSubmit}>

        <fieldset className="fieldsetSearch">
          <legend>Buscar:</legend>
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
        </fieldset>

        <fieldset className="fieldsetAdd">
          <legend>Añadir una nueva frase</legend>
          <label>Frase:</label>
          <input value={newQuote} onInput={handleInputNewQuote} type="text" placeholder='Añade frase...'></input>
          <label>Personaje:</label>
          <input value={newCharacter} onInput={handleInputNewCharacter} type="text" placeholder='Quién lo dijo...'></input>
          <button onClick={handleAddQuote}>Añadir nueva frase</button>
        </fieldset>
      </form>

      <ul>{renderList()}</ul>
    </div>
  );
}

export default App;
