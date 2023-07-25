import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image } from "react-native";
import heartEmpty from "../../../Assets/Images/heartEmpty.png";
import heartFull from "../../../Assets/Images/heartFull.png";
import { addPokemonFavoriteApi, isPokemonFavoriteApi,removePokemonFavoriteApi } from "../../../PokemonApi/FavoriteApi";

export default function Favorite(props) {
  const { id } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id]);

const addFavorite = async () => {
  try {
    await addPokemonFavoriteApi(id);
    setIsFavorite(true);
  } catch (error) {
    console.log("Error adding favorite:", error);
    console.log("Full error object:", error);
  }
};

  const removeFavorite =async () => {
    try {
      await removePokemonFavoriteApi(id);
      setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
      <Image source={isFavorite ? heartFull : heartEmpty} />
    </TouchableOpacity>
  );
}