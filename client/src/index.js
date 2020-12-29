import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import dotenv from 'dotenv';
import reportWebVitals from './reportWebVitals';
import Provider from './ApolloProvider';

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_KEY,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  release: `Chatter${process.env.npm_package_version}`,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// use ApolloProvider as a replace for app
ReactDOM.render(Provider, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
