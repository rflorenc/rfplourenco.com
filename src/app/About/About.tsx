import * as React from 'react';
import { PageSection, Title, TextContent, Text, TextVariants } from '@patternfly/react-core';

const About: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="4xl">About </Title>
    <TextContent>
    <Text component={TextVariants.blockquote}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc
      varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel,
      interdum mattis neque.
    </Text>
    </TextContent>
  </PageSection>
)

export { About };
