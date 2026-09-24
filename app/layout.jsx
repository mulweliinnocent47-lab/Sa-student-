import "./globals.css";

export const metadata = {
  title: "StudyHub SA",
  description: "NSC past papers, study notes and AI practice for South African students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
