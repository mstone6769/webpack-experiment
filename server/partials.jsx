import React from 'react';

import ATFSpecial from '../client/partials/ATFSpecial';
import ATFBasic from '../client/partials/ATFBasic';
import Part2 from '../client/partials/Part2';
import Part3 from '../client/partials/Part3';

export const partials = [
  {
    id: 'ATF',
    component: (props) => {
      if (props?.pageData?.pageType === 'special') {
        return <ATFSpecial {...props} />;
      }
      return <ATFBasic {...props} />
    },
  },
  {
    id: 'part2',
    component: (props) => <Part2 {...props} />,
  },
  {
    id: 'part3',
    component: (props) => <Part3 {...props} />,
  },
];