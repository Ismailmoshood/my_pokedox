import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Home =()=>{
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=600`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
    })
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };
  const getPokemon=(pokemonId)=>{
  const {id, name, sprite} = pokemonData[`${pokemonId}`]
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  
  return(
    
    <div key={pokemonId}>
    <div className="card w-75 mt-5" onClick={()=>navigate(`/${pokemonId}`)}>
    <div className="card-body">
      <h5 className="card-title">{id}. {Name}</h5>
      <img src={sprite} alt="pokemon" className="rounded mx-auto d-block" style={{width: 180, height: 180}}/>
    </div>
    </div>
    </div>
   );
}
   return(
      <>
    <nav className="navbar bg-success">
  <div className="container-fluid">
  
    <p className="navbar-brand" >POKEDOX</p>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange}/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
    </nav>
    
    {pokemonData? 
        (<div className="row row-cols-4 m-5 mt-2">
          {Object.keys(pokemonData).map((pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemon(pokemonId)
          )}
           </div>):(
            <div>
             <h2 className="m-5 mt-2">Loading... </h2> 
            </div>
            
           )} 
      
      </>
   );
}
export default Home;