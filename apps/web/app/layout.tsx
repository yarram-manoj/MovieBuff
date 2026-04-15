'use client';

import { Provider } from 'react-redux';
import { store } from '@repo/store';
import '../styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
