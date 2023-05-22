import React from 'react'

interface Props {
  name: string,
  id: number,
  image: string
}

export default function PokemonList (props: Props) {
  const {name, id , image} = props
  return (
      <section className="p-3 m-3 bg-gray-700 rounded-[10px]">
        <p className='text-center text-gray-200'>{name}</p>
        <img className='flex items-center justify-center' src={image} alt="pokemon"/>
      </section>
  )
}
