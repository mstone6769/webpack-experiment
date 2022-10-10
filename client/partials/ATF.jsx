import React, { useEffect, useState } from 'react';

export function ATF({pageData}) {
  const [name, setName] = useState(pageData.name);
  useEffect(() => {
    setName('hydrated');
  });
  return (
    <>
      <h1>Compiled Page</h1>
      <h2>ATF - {name}</h2>
      <pre>{JSON.stringify(pageData)}</pre>
    </>
  );
}

export default ATF;
