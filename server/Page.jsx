import React from 'react';

import ATFSpecial from '../client/partials/ATFSpecial';
import ATFBasic from '../client/partials/ATFBasic';
import Part2 from '../client/partials/Part2';
import Part3 from '../client/partials/Part3';

export const partials = {
  part2: (props) => <Part2 {...props} />,
  part3: (props) => <Part3 {...props} />
};

export function BTF({pageData}) {
  const { sections = []} = pageData;
  const props = { pageData };
  return sections.map((id) => {
    const sectionComponent = partials[id];
    return <div id={id}>{sectionComponent(props)}</div>;
  });
}

export function ATF({pageData, parsedManifest}) {
  const pageType = pageData?.pageType || 'basic';

  if (pageType === 'special') {
    const scriptPath = parsedManifest['atf-special.js'];
    return (
      <>
        <div id="atf-special"><ATFSpecial pageData={pageData} /></div>
        <script async src={scriptPath}></script>
      </>
    )
  }
  const scriptPath = parsedManifest['atf-basic.js'];
  return (
    <>
      <div id="atf-basic"><ATFBasic pageData={pageData} /></div>
      <script async src={scriptPath}></script>
    </>
  )
}

// used only for server side rendering
export function Page({pageData, parsedManifest}) {
  const props = { pageData };
  return (
    <>
      <ATF pageData={pageData} parsedManifest={parsedManifest} />
      <BTF {...props} />
    </>
  )
}

export default Page;
