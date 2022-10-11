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

// used only for server side rendering
export function Page({pageData, parsedManifest}) {
  const props = { pageData };
  const pageTypes = {
    basic: {
      id: 'atf-basic',
      scriptPath: parsedManifest['atf-basic.js'],
      ATFComponent: <ATFBasic {...props} />
    },
    special: {
      id: 'atf-special',
      scriptPath: parsedManifest['atf-special.js'],
      ATFComponent: <ATFSpecial {...props} />
    }
  };

  const pageType = props?.pageData?.pageType || 'basic';
  const pageTypeData = pageTypes[pageType];

  return (
    <>
      <div id={pageTypeData.id}>
        {pageTypeData.ATFComponent}
      </div>
      <script async src={pageTypeData.scriptPath}></script>
      <BTF {...props} />
    </>
  )
}

export default Page;
