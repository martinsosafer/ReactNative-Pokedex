import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { getPokemonDetail } from '../PokemonApi/PokemonApi';
import Header from '../Components/Pokemon/Header';
import Type from '../Components/Pokemon/Type';
import Stats from '../Components/Pokemon/Stats';
import arrowBack from "../Assets/Images/arrowBack.png";
import Favorite from '../Components/Pokemon/Favorites/Favorite';
import useAuth from '../hooks/useAuth';

export default function PokemonScreen(props) {
  const { navigation, route: { params } } = props;
  const { auth } = useAuth();
  const [pokemon, setPokemon] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={params.id} isFavorite={isFavorite} setIsFavorite={setIsFavorite} />, // Pass the isFavorite and setIsFavorite props to the Favorite component
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrowBack}
            style={{ width: 30, height: 30, marginLeft: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, params, auth, isFavorite,pokemon]);

  useEffect(() => {
    AsyncStorage.getItem('favoritePokemon').then((favoriteState) => {
      if (favoriteState !== null) {
        setIsFavorite(JSON.parse(favoriteState)[params.id] || false);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [params.id]);

  useEffect(() => {
    AsyncStorage.setItem('favoritePokemon', JSON.stringify({ [params.id]: isFavorite }));
  }, [params.id, isFavorite]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetail(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params, navigation]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header name={pokemon.name} order={pokemon.order} image={pokemon.sprites.other["official-artwork"].front_default} type={pokemon.types[0].type.name} />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
