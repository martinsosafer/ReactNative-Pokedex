
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from '../Screens/Pokedex';
import PokemonScreen from '../Screens/Pokemon';

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokedex"component={PokedexScreen}/>
      <Stack.Screen name="PokemonScreen"component={PokemonScreen}options={{title:"",headerTransparent:true}} />
   </Stack.Navigator>
  )
}