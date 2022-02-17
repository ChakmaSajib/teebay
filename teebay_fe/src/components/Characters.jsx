import React from 'react';
import { useCharacters } from '../hooks/useCharacters';

export default function Characters() {
  const { error, loading, data } = useCharacters();
  console.log('characters', data);
  if (loading) return <div>spinner..</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <div>
      {data.characters.results.map((character) => (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  );
}
