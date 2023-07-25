import React, { useState, useEffect } from "react";
import { SafeAreaView ,StyleSheet} from "react-native";
import { getPokemonsApi, getPokemonDetailUrlApi } from "../PokemonApi/PokemonApi";
import PokemonList from "../Components/PokemonList";
import { Searchbar } from 'react-native-paper';
export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next)
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image:
            pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const onChangeSearch = query => setSearchQuery(query);

  const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchQuery.toLowerCase()));
  return (
    <SafeAreaView>
        <Searchbar
        placeholder="Busca a tu Pokemon"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <PokemonList pokemons={filteredPokemons}loadPokemons={loadPokemons} isNext={nextUrl} isLoading={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor:"red",
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 4,
    backgroundColor: 'white',
  },
});