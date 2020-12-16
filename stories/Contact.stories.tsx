import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Contact } from '@app/Contact/Contact';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add(
  'Contact',
  () => <Contact />,
  { info: { inline: true } }
);
