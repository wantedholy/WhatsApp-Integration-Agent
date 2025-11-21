import "../styles/globals.css";

export const metadata = {
  title: "WhatsApp Integration Dashboard",
  description: "Admin dashboard with WhatsApp floating widget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
