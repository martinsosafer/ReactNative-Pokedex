import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash"
import { FAVORITE_STORAGE } from "../Utils/Constant";

export async function getPokemonFavoriteApi(){
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    if (!response) {
      return [];
    }
    return JSON.parse(response);
  } catch (error) {
    throw error;
  }
}


export async function addPokemonFavoriteApi(id) {
 try {
   const favorites = await getPokemonFavoriteApi();
   console.log("favorites:", favorites);
   favorites.push(id);
   await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
   //en storage no podemos guardar ni arrays , ni objetos ,etc solo strings , por eso usamos la funcion stringify
 } catch (error) {
  throw(error)
 }
}

export async function isPokemonFavoriteApi(id) {
  try {
    const response = await getPokemonFavoriteApi();
    return includes(response, id);
    //includes de lodash funciona de manera pone array de un solo nivel. busca dentro del array id , si lo encuentra devuelve true si no false
  } catch (error) {
    
  }
}

export async function removePokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonFavoriteApi();
    //ahora tendriamos que buscar el id que queremos eliminar y sacarlo del array, en vez de hacerlo con un bucle for podemos hacerlo simplemente con pull , funcion que nos ofrece la libreria de lodash.Recordar que solo funciona con arrays de un solo nivel 
    const newFavorites = pull(favorites, id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites))
  } catch (error) {
    throw error;
  }
}