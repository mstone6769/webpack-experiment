import React from 'react';

import ATF from './partials/ATF';
import Part2 from './partials/Part2';
import Part3 from './partials/Part3';

export const partials = [
  {
    id: 'ATF',
    component: (props) => <ATF {...props} />,
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
