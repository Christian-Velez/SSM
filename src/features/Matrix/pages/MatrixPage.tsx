import { isPrime } from '@/features/FiniteFields/utils'
import { InverseMatrix } from '@/features/Matrix/components/InverseMatrix'
import { MultiplyMatrixes } from '@/features/Matrix/components/MultiplyMatrixes'
import { SumMatrixes } from '@/features/Matrix/components/SumMatrixes'
import { Box, Input, Select, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

type Option = 'sum' | 'multiply' | 'inverse'
export type Field = 'finite' | 'infinite'

export function MatrixPage() {
   const [field, setField] = useState<Field>('infinite')
   const [modulus, setModulus] = useState<string>('2')
   const [option, setOperation] = useState<Option>('sum')

   const mod: number | undefined =
      field === 'finite' ? Number(modulus) : undefined

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
                  onChange={(e) => {
                     setModulus(e.target.value)
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
               <option value='inverse'>Inverse</option>
            </Select>
         </VStack>

         {mod !== undefined ? (
            isPrime(mod) ? (
               <Content option={option} field={field} mod={mod} />
            ) : (
               <Text>Field must be a prime number</Text>
            )
         ) : (
            <Content option={option} field={field} mod={mod} />
         )}
      </Box>
   )
}

function Content({
   option,
   field,
   mod,
}: {
   option: Option
   field: Field
   mod: number | undefined
}) {
   return (
      <VStack py={20} flexWrap='wrap'>
         {option === 'sum' && <SumMatrixes field={field} mod={mod} />}
         {option === 'multiply' && <MultiplyMatrixes field={field} mod={mod} />}

         {option === 'inverse' && <InverseMatrix field={field} mod={mod} />}
      </VStack>
   )
}
