import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from './';

export default {
  title: 'Design System/Button',
  component: Button,
  args: {
    children: 'Button',
    ghost: false,
    danger: false,
    disabled: false,
    loading: false,
    size: 'middle',
    shape: null,
  },
  argTypes: {
    shape: {
      control: {
        type: 'inline-radio',
        options: [null, 'circle', 'round'],
      },
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['small', 'middle', 'large'],
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  type: 'default',
};
export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: 'primary',
};
export const GhostButton = Template.bind({});
GhostButton.args = {
  type: 'ghost',
};
export const DashedButton = Template.bind({});
DashedButton.args = {
  type: 'dashed',
};
export const LinkButton = Template.bind({});
LinkButton.args = {
  type: 'link',
};
export const TextButton = Template.bind({});
TextButton.args = {
  type: 'text',
};
