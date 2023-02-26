import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'

interface AppProviderProps {
   children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
   return (
      <ChakraProvider>
         <Router>{children}</Router>
      </ChakraProvider>
   )
}
