import "./globals.css";

export const metadata = {
  title: "Mukilan Rajaram | Frontend Developer",
  description:
    "Mukilan Rajaram is a passionate Frontend Developer skilled in building responsive, high-performance web applications using modern JavaScript frameworks like React and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`  antialiased`}>{children}</body>
    </html>
  );
}
