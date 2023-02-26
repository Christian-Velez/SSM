import { Navbar } from '@/components/Navbar'
import { Box, Container } from '@chakra-ui/react'

interface LayoutProps {
   children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
   return (
      <Container maxW='container.xl' h='full'>
         <Navbar />

         <Box py={10}>{children}</Box>
      </Container>
   )
}
