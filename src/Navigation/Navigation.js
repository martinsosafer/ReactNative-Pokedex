import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image,View,Text} from 'react-native';
import PokedexImage from "../Assets/Images/Pokedex.png"
import PikachuHeart from "../Assets/Images/PikachuHeart.png"
import UserPokemon from "../Assets/Images/UserPokemon.png"
import FavoritesScreen from '../Screens/Favorites';
import Account from '../Screens/Account';

import PokedexNavigation from './PokedexNavigation';
const Tab = createBottomTabNavigator();


export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName='Pokedex' screenOptions={{
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4, // add some margin below the labels
      },
      tabStyle: {
        flexDirection: "column", // arrange tab items in a column
        alignItems: "center", // center the items horizontally
      },
     
    }}>
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
        tabBarLabel: "Favoritos",
        tabBarIcon: ()=> RenderFavoritesIcon(), 
        headerTitle: "Favoritos",
        tabBarLabelStyle: {
          fontSize: 16,
          color: "black", // replace with your desired color
          fontWeight: "bold",
        },
      }} />
      <Tab.Screen name="Pokedex" component={PokedexNavigation} options={{
        tabBarLabel: "Pokedex",
        tabBarIcon: () => RenderPokedexIcon(),
        headerTitle: "Pokedex",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          color: "red", // replace with your desired color
          fontWeight: "bold",
        },
      }} />
      <Tab.Screen name="Account" component={Account}  options={{
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ()=>RenderUserIcon(),
        headerTitle: "Mi Cuenta",
        tabBarLabelStyle: {
          fontSize: 16,
          color: "black", // replace with your desired color
          fontWeight: "bold",
        },
      }} />
    </Tab.Navigator>
  )
}

function RenderFavoritesIcon(){
  return (
    <View style={{alignItems: "center"}}>
      <Image source={PikachuHeart} style={{width: 50, height: 50}} />
      <Text></Text>
    </View>
  )
}

function RenderPokedexIcon(){
  return (
    <View style={{alignItems: "center"}}>
      <Image source={PokedexImage} style={{width: 50, height: 50}} />
      <Text></Text>
    </View>
  )
}

function RenderUserIcon(){
  return (
    <View style={{alignItems: "center"}}>
      <Image source={UserPokemon} style={{width: 50, height: 50}} />
      <Text></Text>
    </View>
  )
}