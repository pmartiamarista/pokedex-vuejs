import gql from "graphql-tag";

export const GENERATIONS_QUERY = gql`
  query GENERATIONS_QUERY {
    generations: pokemon_v2_generation {
      id
      region_id
      name
    }
  }
`;

export const POKEMON_PER_GEN_QUERY = gql`
  query POKEMON_PER_GEN_QUERY($id: Int) {
    pokemon_v2_generation(where: {region_id: {_eq: $id}}) {
      id
      region_id
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        list: nodes {
          id
          name
          data: pokemon_v2_pokemons {
            sprites: pokemon_v2_pokemonsprites {
              sprites
            }
            types: pokemon_v2_pokemontypes {
              id
              pokemon_v2_type {
                id
                name
              }
            }
          }
        }
      }
  }
}`;