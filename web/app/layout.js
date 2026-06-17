import './globals.css';

export const metadata = {
  title: 'NFC Greeting',
  description: 'NFC web bridge for opening the mobile app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
