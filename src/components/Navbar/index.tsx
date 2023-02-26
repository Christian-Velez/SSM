import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
   Box,
   Flex,
   IconButton,
   Link as ChakraLink,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Stack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface NavLink {
   to: string
   label: string
}

const navigation: NavLink[] = [
   {
      to: '/',
      label: 'Home',
   },
   {
      to: '/vigenere-cipher',
      label: 'Vigenere Cipher',
   },
   {
      to: '/finite-fields',
      label: 'Finite Fields',
   },
   {
      to: '/matrix',
      label: 'Matrix',
   },
]

function NavItem({ item }: { item: NavLink }) {
   return (
      <ChakraLink as={Link} to={item.to} color='whiteAlpha'>
         {item.label}
      </ChakraLink>
   )
}

export function Navbar() {
   return (
      <Box as='nav' w='100%' zIndex={2} p={5}>
         <Flex
            display='flex'
            wrap='wrap'
            align='center'
            justify='space-between'
         >
            <Stack
               direction={{ base: 'column', md: 'row' }}
               display={{ base: 'none', md: 'flex' }}
               width={{ base: 'full', md: 'auto' }}
               alignItems='center'
               w='full'
               spacing={10}
               mt={{ base: 4, md: 0 }}
            >
               {navigation.map((item) => (
                  <NavItem key={item.to} item={item} />
               ))}
            </Stack>

            <Flex flex={1} justifyContent='flex-end'>
               <ThemeToggleButton />

               <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                  <Menu isLazy id='navbar-menu'>
                     <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        variant='outline'
                        aria-label='Options'
                     />
                     <MenuList>
                        {navigation.map((item) => (
                           <MenuItem key={item.to}>
                              <NavItem item={item} />
                           </MenuItem>
                        ))}
                     </MenuList>
                  </Menu>
               </Box>
            </Flex>
         </Flex>
      </Box>
   )
}
