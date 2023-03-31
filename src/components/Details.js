import React, { useState, useEffect } from "react";
import {  useParams, Link } from "react-router-dom"
import axios from "axios";

const Details = () =>{
   let params = useParams()
   const { pokemonid }= params
   const [pokemon, setPokemon]= useState(undefined)
   useEffect(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonid}/`)
        .then(function (response) {
          const { data } = response;
          setPokemon(data);
        })
        .catch(function (error) {
          setPokemon(false);
        });
    }, [pokemonid]);
   const getPokemonJSX =()=>{
      const {name, id, species, height, weight, types, sprites} = pokemon
      const Name = name.charAt(0).toUpperCase() + name.slice(1);
      let newId;
      if(id < 10){
         newId = '00' + id;
      }else if(id>=10 && id < 100){
         newId = '0' + id;
      }else{
         newId = id;
      }
      const fullImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newId}.png`
   return (
      <div className="m-4">
         <h1>
          {`${id}.`} {Name}
          <img src={sprites.front_default} alt="pokemon"/>
        </h1>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt="full-pokemon"/>
        <h3>Pokemon Info</h3>
        <div>
          {"Species: "} <a href={species.url}>{species.name} </a>
        </div>
        <div>Height: {height} </div>
        <div>Weight: {weight} </div>
        <h6> Types:</h6>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <div key={name}> {`${name}`}</div>;
        })}
      </div>
   );
   }
   return <> 
      {pokemon !== undefined && (
        <Link to="/" className=" btn btn-success dark fw-800 m-2">&#8592; Back to Home</Link>
      )}
      {pokemon === undefined && <h2 className="m-5 mt-2">Loading... </h2> }
      {pokemon !== undefined && pokemon && getPokemonJSX(pokemon)}
      {pokemon === false && <h2> Pokemon not found</h2>}

   </>
}
export default Details;