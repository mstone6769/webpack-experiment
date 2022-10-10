import React, { useEffect, useState } from 'react';

export function Part2({pageData}) {
  const [name, setName] = useState(pageData.name);
  useEffect(() => {
    setName('hydrated');
  });
  return (
    <>
      <h2>Part 2 - {name}</h2>
      <pre>{JSON.stringify(pageData)}</pre>
    </>
  );
}

export default Part2;
