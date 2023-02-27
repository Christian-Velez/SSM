import { Field } from '@/features/Matrix/pages'
import { HStack, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Matrix } from './Matrix'
import { useMatrix } from '../hooks/index'
import { ArrToMatrix, StrArrayToNumber } from '@/features/Matrix/utils'
import { inverseMatrix } from '../utils/operations'
import { matrixToArray } from '../utils/format'

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
   const matrixR = inverseMatrix(a, mod)
   const result = matrixToArray(matrixR).map((v) => v.toString())

   return (
      <VStack spacing={10}>
         <HStack>
            <Input
               w={20}
               type='number'
               value={size}
               onChange={(e) => setSize(e.target.value)}
            />
         </HStack>

         <HStack spacing={5}>
            <Matrix
               rows={size}
               columns={size}
               values={matrix}
               onCellChange={onCellChange}
               field={field}
               mod={mod}
            />
         </HStack>

         <Matrix
            rows={size}
            columns={size}
            values={result}
            field={field}
            mod={mod}
            cellSize='70px'
         />
      </VStack>
   )
}
