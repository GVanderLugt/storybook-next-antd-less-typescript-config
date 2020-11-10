import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TestImage from './';

export default {
  title: 'Design System/Test Image',
  component: TestImage,
} as Meta;

const Template: Story<ComponentProps<typeof TestImage>> = (args) => (
  <TestImage {...args} />
);

export const DefaultTestImage = Template.bind({});
