import React from "react"
import "./globals.css"
import I18nProviderWrapper from "./components/I18nProviderWrapper"

export const metadata = {
  title: "Saphal Chudal - Frontend Developer Portfolio",
  description:
    "Aspiring frontend developer with strong skills in HTML, CSS, JavaScript, and React. Building impactful and user-friendly web applications.",
  keywords: "frontend developer, react developer, web developer, javascript, portfolio",
  authors: [{ name: "Saphal Chudal" }],
  openGraph: {
    title: "Saphal Chudal - Frontend Developer Portfolio",
    description: "Aspiring frontend developer with strong skills in HTML, CSS, JavaScript, and React.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth font-sans">
      <body>
        <I18nProviderWrapper>
          {children}
        </I18nProviderWrapper>
      </body>
    </html>
  )
}