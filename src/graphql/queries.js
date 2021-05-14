import gql from 'graphql-tag'

export const REGIONS_QUERY = gql`
  query REGIONS_QUERY {
    regions: pokemon_v2_region {
      id
      name
    }
  }
`

export const POKEMONS_BY_REGION_QUERY = gql`
  query POKEMONS_BY_REGION_QUERY($id: Int) {
    pokemon_v2_generation(where: { region_id: { _eq: $id } }) {
      id
      region_id
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        list: nodes {
          id
          name
        }
      }
    }
  }
`

export const POKEMONS_BY_TYPE_QUERY = gql`
  query POKEMONS_BY_TYPE_QUERY {
    types: pokemon_v2_type {
      name
      id
      generation_id
      pokemons: pokemon_v2_pokemontypes_aggregate {
        nodes {
          pokemon: pokemon_v2_pokemon {
            name
            id
          }
        }
      }
    }
  }
`

export const POKEMON_BY_NAME = gql`
  query POKEMON_BY_NAME($name: String!) {
    pokemon(name: $name) {
      id
      location_area_encounters
      name
      stats {
        stat {
          name
        }
        effort
        base_stat
      }
      types {
        slot
        type {
          name
        }
      }
      sprites {
        front_default
        back_default
        front_shiny
        back_shiny
      }
    }
  }
`
