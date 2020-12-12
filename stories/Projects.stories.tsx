import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Projects } from '@app/Projects/Projects';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add(
  'Projects',
  () => <Projects />,
  { info: { inline: true } }
);
