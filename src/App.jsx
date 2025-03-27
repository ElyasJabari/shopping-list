import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import ShoppingList from './components/Shoppinglist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingList />
  </StrictMode>,
)
