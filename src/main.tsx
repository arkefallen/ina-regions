import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import FilterPage from './FilterPage'
import { regionLoader } from './loader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FilterPage />,
    loader: regionLoader,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
