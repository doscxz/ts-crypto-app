import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CryptoContextProvider } from './context/crypto-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </StrictMode>,
)
