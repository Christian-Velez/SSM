import { useState } from 'react'
import { useMatrix } from '../hooks/index'
import { matrixToArray } from '../utils/format'
import { MatrixContainer } from '@/features/Matrix/components/MatrixContainer'
import { inverseMatrix } from '../utils/operations'
import { Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { ArrToMatrix, StrArrayToNumber } from '@/features/Matrix/utils'
import { FieldText } from './FieldText'
import { Field } from '@/features/Matrix/pages'

interface InverseMatrixProps {
   field: Field
   modulus: number
}

function format(array: Array<string>, size: string): Array<Array<number>> {
   const asArrayN = StrArrayToNumber(array)
   const asMatrix = ArrToMatrix(asArrayN, Number(size), Number(size))
   return asMatrix
}

export function InverseMatrix({ field, modulus }: InverseMatrixProps) {
   const [size, setSize] = useState('2')
   const [matrix, onCellChange] = useMatrix(Number(size), Number(size))
   const mod = field === 'finite' ? modulus : undefined

   const a = format(matrix, size)
   const [matrixR, extended] = inverseMatrix(a, mod)
   const result = matrixToArray(matrixR).map((v) => v.toString())
   const extendedArr = matrixToArray(extended).map((v) => v.toString())

   return (
      <VStack spacing={10}>
         <Heading fontSize='2xl'>
            Inverse matrix {mod && <FieldText mod={mod} />}
         </Heading>

         <HStack>
            <Input
               w={20}
               type='number'
               min={1}
               max={10}
               value={size}
               onChange={(e) => setSize(e.target.value)}
            />
         </HStack>

         <HStack spacing={5}>
            <MatrixContainer
               rows={size}
               columns={size}
               values={matrix}
               onCellChange={onCellChange}
               field={field}
               mod={mod}
            />
         </HStack>

         <Text fontWeight='bold' textColor='blue.500'>
            Result
         </Text>
         <MatrixContainer
            rows={size}
            columns={size}
            values={result}
            field={field}
            mod={mod}
         />

         <Text fontWeight='bold' textColor='teal.500'>
            Extended matrix
         </Text>
         <MatrixContainer
            rows={size}
            columns={(Number(size) * 2).toString()}
            values={extendedArr}
            field={field}
            mod={mod}
         />
      </VStack>
   )
}
