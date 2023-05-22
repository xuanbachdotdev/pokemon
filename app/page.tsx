"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon, Pokemons } from "@/interface";

import React from "react";
import PokemonList from "@/components/PokemonList";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextOffset, setNextOffset] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  const getPokemons = async (offset: number) => {
    setLoading(true);
    await axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 20,
          offset: { offset },
        },
      })
      .then((res) => {
        setNextOffset(nextOffset + 20);
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setPokemons((p) => [...p, poke.data]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoadmore: () => void = () => {
    setLoading(true);
    getPokemons(nextOffset);
  };

  useEffect(() => {
    handleLoadmore();
  }, []);

  return (
    <div className="">
      <div className="mx-1 my-2 h-screen flex flex-col items-center">
        <header className="text-center text-4xl tracking-[0.25rem] font-semibold text-gray-200 mt-4">
          Pokemon
        </header>
        <div className="items-center flex flex-wrap justify-center mt-8 font-semibold">
          {pokemons.map((pokemon, index) => {
            return (
              <PokemonList
                key={index}
                name={pokemon.name}
                id={pokemon.id}
                image={pokemon.sprites.front_default}
              />
            );
          })}
        </div>
        <div className="py-11">

        {loading ? (
          <button className="bg-stone-700 text-white p-2 rounded-lg">
            Loading...
          </button>
        ) : (
          <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleLoadmore}>
            Load more
          </button>
        )}
        </div>
      </div>
    </div>
  );
}
