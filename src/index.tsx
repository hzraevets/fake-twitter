import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { ThemeProvider } from 'effects/Theme';
import { IdentityProvider } from 'effects/Identity';
import { TweetProvider } from 'effects/Tweet';
import { timeLine } from 'query/TimeLine';

import './index.css';
import { App } from "./App";
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <TweetProvider>
      <ThemeProvider>
        <IdentityProvider>
          <QueryClientProvider client={timeLine}>
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
