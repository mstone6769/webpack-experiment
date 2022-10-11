import React from 'react';

export function BTF({pageData}) {
  const { sections = []} = pageData;
  return sections.map((id) => {
    return <div id={id}></div>;
  });
}

export default BTF;
