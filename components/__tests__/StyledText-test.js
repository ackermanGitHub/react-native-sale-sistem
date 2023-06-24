import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../theme/StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
