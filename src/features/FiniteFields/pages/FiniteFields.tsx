import { Input } from '@/components/Input'
import {
   inverseAdditive,
   modularInverse,
   mod,
   isPrime,
} from '@/features/FiniteFields/utils'
import { FieldText } from '@/features/Matrix/components/FieldText'
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export function FiniteFields() {
   const [field, setField] = useState('11')
   const _field = Number(field)
   const isValid = isPrime(_field)

   return (
      <VStack>
         <VStack w='400px' spacing={20}>
            <HStack w='full'>
               <Input
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  label='Field'
                  type='number'
               />
            </HStack>

            {isValid ? (
               <Operations field={_field} />
            ) : (
               <Text>Field must be a prime number</Text>
            )}
         </VStack>
      </VStack>
   )
}

function Operations({ field }: { field: number }) {
   const [number, setNumber] = useState('')
   const [number2, setNumber2] = useState('')
   const [number3, setNumber3] = useState('')
   const inverseAdd = inverseAdditive(Number(number), field)
   const modInverse = modularInverse(Number(number2), field)
   const modulus = mod(Number(number3), field)

   return (
      <VStack w='full' spacing={10}>
         <Heading>
            <FieldText mod={Number(field)} />
         </Heading>

         <Box w='full'>
            <Input
               value={number3}
               onChange={(e) => setNumber3(e.target.value)}
               label='Modulus'
               type='number'
            />
            <Text mt={2}>
               <strong>
                  mod({Number(number3)}, {Number(field)})
               </strong>{' '}
               = {modulus}
            </Text>
         </Box>

         <Box w='full'>
            <Input
               value={number}
               onChange={(e) => setNumber(e.target.value)}
               label='Inverse aditive of'
               type='number'
            />
            <Text> = {inverseAdd}</Text>
         </Box>

         <Box w='full'>
            <Input
               value={number2}
               onChange={(e) => setNumber2(e.target.value)}
               label='Modular inverse of'
               type='number'
            />
            <Text> = {modInverse}</Text>
         </Box>
      </VStack>
   )
}
