import React, { useEffect, useState } from 'react';

export function ATFBasic({pageData}) {
  const [name, setName] = useState('thirsty');
  useEffect(() => {
    setName('hydrated');
  });
  return (
    <>
      <h1>Compiled Page</h1>
      <h2>ATF Basic - {name}</h2>
      <pre>{JSON.stringify(pageData)}</pre>
    </>
  );
}

export default ATFBasic;
