import React, { useEffect, useState } from 'react';

export function Part3({pageData}) {
  const [name, setName] = useState('thirsty');
  useEffect(() => {
    setName('hydrated');
  });
  return (
    <>
      <h2>Part 3 - {name}</h2>
      <pre>{JSON.stringify(pageData)}</pre>
    </>
  );
}

export default Part3;
