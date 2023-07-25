import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React from 'react'
import getColorByPokemonType from '../Utils/GetColorByType';
import { capitalize } from "lodash";
import { useNavigation } from '@react-navigation/native';
export default function PokemonCard(props) {
  const { pokemon } = props;
  const navigation = useNavigation();
  const pokemonColor = getColorByPokemonType(pokemon.type)
  const bgStyles = { backgroundColor: pokemonColor, ...stylesCard.bgStyles }

  const goToPokemon = () => {
   navigation.navigate("PokemonScreen",{id:pokemon.id})
  }

  return (
    <SafeAreaView style={stylesCard.container}>
      <TouchableWithoutFeedback onPress={goToPokemon}>
        <View style={stylesCard.card}>
          <View style={stylesCard.spacing}>
            <View style={bgStyles}>
              <Text style={stylesCard.number}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
              <Text style={stylesCard.name}>{capitalize(pokemon.name)}</Text>
              <Image source={{ uri: pokemon.image }} style={stylesCard.image} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const stylesCard = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    height: 110,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
})
