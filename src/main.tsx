import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import I18nProviderWrapper from './components/I18nProviderWrapper.tsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrowserRouter } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProviderWrapper>
        <App />
      </I18nProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
)
