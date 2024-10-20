import React, { useEffect }  from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider} from 'react-router-dom'
import router from './Router'
import { LanguageProvider } from './pages/LanguageContext'




function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
  </LanguageProvider>
  )
}

export default App
