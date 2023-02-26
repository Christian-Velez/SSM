import { SumMatrixes } from '@/features/Matrix/components/SumMatrixes'
import { Box, Input, Select, VStack } from '@chakra-ui/react'
import { useState } from 'react'

type Option = 'sum' | 'multiply' | 'invert'
export type Field = 'finite' | 'infinite'

export function MatrixPage() {
   const [field, setField] = useState<Field>('infinite')
   const [modulus, setModulus] = useState(2)
   const [option, setOperation] = useState<Option>('sum')

   return (
      <Box>
         <VStack spacing={5} alignItems='start' w={200}>
            <Select
               title='Field'
               value={field}
               onChange={(e) => {
                  setField(e.target.value as Field)
               }}
            >
               <option value='infinite'>Infinite</option>
               <option value='finite'>Finite</option>
            </Select>

            {field === 'finite' && (
               <Input
                  value={modulus}
                  type='number'
                  min={2}
                  onChange={(e) => {
                     setModulus(Number(e.target.value))
                  }}
               />
            )}

            <Select
               title='Operation'
               value={option}
               onChange={(e) => {
                  setOperation(e.target.value as Option)
               }}
            >
               <option value='sum'>Sum</option>
               <option value='multiply'>Multiply</option>
               <option value='invert'>Invert</option>
            </Select>
         </VStack>

         {option === 'sum' && <SumMatrixes field={field} modulus={modulus} />}
      </Box>
   )
}
