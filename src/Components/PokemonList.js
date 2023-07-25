import { StyleSheet, FlatList, ActivityIndicator,Platform} from 'react-native'
import React, { useState } from 'react'
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext } = props;
  const [isLoading, setIsLoading] = useState(false);
  
  const loadMorePokemon = () => {
    if (!isLoading) {
      setIsLoading(true);
      loadPokemons().then(() => setIsLoading(false));
    }
  }
  
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && !isLoading && loadMorePokemon}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isLoading && <ActivityIndicator size="large" style={styles.spinner} color="red" />}
    />
  )
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop:Platform.OS==="android"?30:0 
  },
  spinner: {
    marginTop: 20,
    marginBottom:60,
  },
})
