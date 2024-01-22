import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import Inscription from './pages/inscription.jsx'
import Connexion from './pages/connexion.jsx'
import { Toaster} from 'react-hot-toast';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()
const route = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/connexion',
    element: <Connexion />
  },
  {
    path: '/inscription',
    element: <Inscription />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={route}></RouterProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
