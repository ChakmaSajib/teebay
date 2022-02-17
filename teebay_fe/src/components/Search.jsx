import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const GET_LOCATIONS_NAME = gql`
  query GetLocations($name : String!)(
    characters(filter: {
          name: $name
      }){
          results{
              location{
                  name
              }
          }
      }
  )
`;
export default function Search() {
  const [name, setName] = useState('');
  const [getLocations, { error, loading, data }] = useLazyQuery(
    GET_LOCATIONS_NAME,
    {
      variables: {
        name
      }
    }
  );

  console.log(error, loading, data);
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => getLocations()}>Search</button>
      {loading && <div>spanner</div>}
      {data && (
        <ul>
          {data.characters.results.map((character) => (
            <li>character.location</li>
          ))}
        </ul>
      )}
    </div>
  );
}
