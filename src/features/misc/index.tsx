import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import reactLogo from '../../assets/react.svg'
import './styles/index.css'

export function Landing() {
   return (
      <VStack spacing={10}>
         <Flex w='full' justify='center'>
            <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
               <img src='/vite.svg' className='logo' alt='Vite logo' />
            </a>
            <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
               <img src={reactLogo} className='logo react' alt='React logo' />
            </a>
         </Flex>

         <Heading>SSM</Heading>

         <Box className='card' textAlign='justify' maxW='60ch'>
            <p>
               Edit <code>src/App.tsx</code> and save to test HMR
            </p>

            <p className='read-the-docs'>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
               Expedita ex doloribus quo id amet provident soluta ad. Dolore
               voluptatum maxime ex! Inventore iste dolor illum similique nobis
               quas placeat facilis!
            </p>
         </Box>
      </VStack>
   )
}
