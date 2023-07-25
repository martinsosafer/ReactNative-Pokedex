import { API_HOST } from "../Utils/Constant";

export async  function getPokemonsApi(endPointUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(endPointUrl||url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
//usamos limit para los usuarios con moviles mas lentos y offset=0 para que empieze del pokemon num 0(osea el primer pokemon que traemos de la api

export async function getPokemonDetailUrlApi(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetail(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`
    const response = await fetch(url)
    const result = await response.json();
    return result
  } catch (error) {
    throw error 
  }
}