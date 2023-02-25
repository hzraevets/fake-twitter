import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { ThemeProvider } from 'effects/Theme';
import { IdentityProvider } from 'effects/Identity';
import { TweetProvider } from 'effects/Tweet';
import { timeLineQuery } from 'query/TimeLine';

import './index.css';
import { App } from "./App";
import reportWebVitals from './reportWebVitals';

// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TweetProvider>
      <ThemeProvider>
        <IdentityProvider>
          <QueryClientProvider client={timeLineQuery}>
            <App/>
          </QueryClientProvider>
        </IdentityProvider>
      </ThemeProvider>
    </TweetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
