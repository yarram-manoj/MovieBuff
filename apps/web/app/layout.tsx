'use client';

import { Provider } from 'react-redux';
import { store } from '@repo/store';
import { ErrorBoundary } from '@repo/ui';
import '../styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">
          <ErrorBoundary>
            <Provider store={store}>{children}</Provider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
