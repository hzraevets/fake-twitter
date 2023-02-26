import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Page404 } from 'views/Page404';
import './App.css';

export default {
  title: 'Views/Page404',
  component: Page404,
  decorators: [
    (Story, Context) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof Page404>;

const Template: ComponentStory<typeof Page404> = () => <Page404 />;

export const Preview = Template.bind({});
