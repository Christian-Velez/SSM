import { inverseAdditive, modularInverse } from '@/features/FiniteFields/utils'
import { Box, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'

export function FiniteFields() {
   const [number, setNumber] = useState('')
   const [number2, setNumber2] = useState('')
   const [mod, setMod] = useState('11')
   const inverseAdd = inverseAdditive(Number(number), Number(mod))
   const modInverse = modularInverse(Number(number2), Number(mod))

   return (
      <Box>
         <Input
            value={mod}
            onChange={(e) => setMod(e.target.value)}
            title='Hol'
            type='number'
         />
         <Heading mt={20}>Inverse additive</Heading>
         <HStack>
            <Input
               value={number}
               onChange={(e) => setNumber(e.target.value)}
               title='Hol'
               type='number'
            />
         </HStack>
         <Text> = {inverseAdd}</Text>

         <Heading mt={20}>Modular inverse</Heading>
         <HStack>
            <Input
               value={number2}
               onChange={(e) => setNumber2(e.target.value)}
               title='Hol'
               type='number'
            />
         </HStack>
         <Text> = {modInverse}</Text>
      </Box>
   )
}
