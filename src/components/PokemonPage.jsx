import React, { useState, useEffect } from "react";

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2024-12-17/data_153140.plain");
        const data = await response.json();
        setPokemonList(data.results);
        setSelectedPokemon(data.results[0].name); 
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  

  const handleNext = () => {
    const currentIndex = pokemonList.findIndex((pokemon) => pokemon.name === selectedPokemon);
    if (currentIndex < pokemonList.length - 1) {
      setSelectedPokemon(pokemonList[currentIndex + 1].name);
    }
  };

  const handlePrevious = () => {
    const currentIndex = pokemonList.findIndex((pokemon) => pokemon.name === selectedPokemon);
    if (currentIndex > 0) {
      setSelectedPokemon(pokemonList[currentIndex - 1].name);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pokemon Page</h1>
   

   
      <select
        value={selectedPokemon}
        
        style={{ padding: "8px", fontSize: "16px" }}
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>

     

      <div style={{ margin: "20px 0" }}>
        <img src=''/>
        <button onClick={handlePrevious}
          disabled={pokemonList.findIndex((pokemon) => pokemon.name === selectedPokemon) === 0}
        >
          Previous
        </button>

       
        <button
          onClick={handleNext}
          disabled={
            pokemonList.findIndex((pokemon) => pokemon.name === selectedPokemon) ===
            pokemonList.length - 1
          }
          
        >
          Next
        </button>
      </div>

      
      {loading ? (
        <p>Loading...</p>
      ) : pokemonData ? (
        <div>
          <h2>{pokemonData.name.toUpperCase()}</h2>
          <img src={pokemonData.image} alt={pokemonData.name}/>
          <p>{pokemonData.description}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PokemonPage;


