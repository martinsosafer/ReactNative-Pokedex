import { View, Text,StyleSheet, Button } from 'react-native'
import React,{useState,useCallback} from 'react'
import useAuth from "../../hooks/useAuth"
import { useFocusEffect } from "@react-navigation/native"
import { size } from 'lodash'
import { getPokemonFavoriteApi } from '../../PokemonApi/FavoriteApi'
export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0)
   useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonFavoriteApi();
          setTotal(size(response));
        } catch (error) {
          setTotal(0);
        }
      })();
    }, [])
  );
//con las funciones de arriba y con la funcion size de lodash puedo contar cuantos elementos llegan en un array. oseacontaria cuantos elementos hay en el array de favoritos
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
      <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`}</Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="email" text={auth.email} />
        <ItemMenu title="Cantidad de Favoritos" text={`${total} pokemon`}/>
      </View>
      <Button title='cerrar sesion' onPress={logout}/>
    </View>
  )
}

function ItemMenu(props) {
  const { title, text } = props;
  return (
    <View style={styles.itemsMenu}>
      <Text style={styles.itemMenuTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop:20,
  },
  titleBlock: {
    marginBottom:30
  },
  title: {
    fontWeight: "bold",
    fontSize:22
  },
  dataContent: {
    marginBottom:20
  },
  itemsMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 3,
    borderColor:"blue"
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width:120,
  }
})