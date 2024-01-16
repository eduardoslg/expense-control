import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { LoadingProvider } from '@siakit/loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './components/theme-provider'
import { AuthContextProvider } from './contexts/authContext'
import { AppRoutes } from './routes/AppRoutes'
import './global.css'

const queryClient = new QueryClient()

export function App() {
  useEffect(() => {
    localStorage.setItem('vite-ui-theme', 'light')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingProvider>
          <AuthContextProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AppRoutes />

              <Toaster position="top-right" />
            </ThemeProvider>
          </AuthContextProvider>
        </LoadingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
