import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getPokemonFavoriteApi } from '../PokemonApi/FavoriteApi'
import { getPokemonDetail } from '../PokemonApi/PokemonApi';
import PokemonList from '../Components/PokemonList';
import useAuth from '../hooks/useAuth';
export default function FavoritesScreen() {
  const [pokemons, setPokemon] = useState([]);
  const { auth } = useAuth();
  
  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await getPokemonFavoriteApi();
        const pokemonsArray = [];
      for await (const id of response) {
        const pokemonDetails = await getPokemonDetail(id);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image:
            pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemon(pokemonsArray)
      })();
    }
  }),[auth]

  
  return (
    !auth ? (<Text>Usuario no logeado, registrarse para poder ver a los favoritos</Text>
    ): (
        <PokemonList pokemons={pokemons} />)
  )
}