import React from 'react'
import { useCharacter } from '../hooks/useCharacter'

export default function Character() {
    const { error, loading, data } = useCharacter(4)
    console.log(error, loading, data)
    return (
        <div>
            <img src={data.character.image} alt={data.character.name} width={750} />
        </div>
    )
}
