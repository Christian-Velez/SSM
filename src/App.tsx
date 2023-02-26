import './App.css'
import AppProvider from './providers'
import { AppRouter } from './router'

function App() {
   return (
      <AppProvider>
         <AppRouter />
      </AppProvider>
   )
}

export default App
