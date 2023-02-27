import { CloseIcon } from '@chakra-ui/icons'
import { Field } from '@/features/Matrix/pages'
import { HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { Matrix } from '@/features/Matrix/components/Matrix'
import { useMatrix } from '@/features/Matrix/hooks'
import { useState } from 'react'
import {
   multiplyMatrixes,
   StrArrayToNumber,
   ArrToMatrix,
   matrixToArray,
} from '@/features/Matrix/utils'

interface MultiplyMatrixesProps {
   field: Field
   modulus: number
}

const MAX_MATRIX_SIZE = 5

function format(
   array: Array<string>,
   rows: string,
   columns: string
): Array<Array<number>> {
   const asStr = StrArrayToNumber(array)
   const asMatrix = ArrToMatrix(asStr, Number(rows), Number(columns))
   return asMatrix
}

export function MultiplyMatrixes({ field, modulus }: MultiplyMatrixesProps) {
   const [rowsA, setRowsA] = useState('2')
   const [columnsA, setColumnsA] = useState('2')
   const [matrixA, onMatrixAChange] = useMatrix(Number(rowsA), Number(columnsA))

   const [rowsB, setRowsB] = useState('2')
   const [columnsB, setColumnsB] = useState('2')
   const [matrixB, onMatrixBChange] = useMatrix(Number(rowsB), Number(columnsB))

   const mod = field === 'finite' ? modulus : undefined
   const isValid = columnsA === rowsB

   const a = format(matrixA, rowsA, columnsA)
   const b = format(matrixB, rowsB, columnsB)
   const matrixR = multiplyMatrixes(a, b, mod)
   const result = matrixToArray(matrixR).map((v) => v.toString())

   return (
      <VStack spacing={10}>
         <HStack spacing={5}>
            <VStack>
               <HStack>
                  <Input
                     w={20}
                     value={rowsA}
                     onChange={(e) => setRowsA(e.target.value)}
                     type='number'
                     min={0}
                     max={MAX_MATRIX_SIZE}
                  />

                  <Text>X</Text>

                  <Input
                     w={20}
                     value={columnsA}
                     onChange={(e) => setColumnsA(e.target.value)}
                     type='number'
                     min={0}
                     max={MAX_MATRIX_SIZE}
                  />
               </HStack>

               <Matrix
                  rows={rowsA}
                  columns={columnsA}
                  values={matrixA}
                  onCellChange={onMatrixAChange}
                  field={field}
                  mod={mod}
               />
            </VStack>

            <IconButton aria-label='Close' icon={<CloseIcon />} />

            <VStack>
               <HStack>
                  <Input
                     w={20}
                     value={rowsB}
                     type='number'
                     min={0}
                     max={MAX_MATRIX_SIZE}
                     onChange={(e) => setRowsB(e.target.value)}
                  />

                  <Text>X</Text>

                  <Input
                     w={20}
                     value={columnsB}
                     type='number'
                     min={0}
                     max={MAX_MATRIX_SIZE}
                     onChange={(e) => setColumnsB(e.target.value)}
                  />
               </HStack>

               <Matrix
                  rows={rowsB}
                  columns={columnsB}
                  values={matrixB}
                  onCellChange={onMatrixBChange}
                  field={field}
                  mod={mod}
               />
            </VStack>
         </HStack>

         {isValid ? (
            <Matrix
               rows={rowsA}
               columns={columnsB}
               values={result}
               field={field}
               mod={mod}
            />
         ) : (
            <Text>Matrixes sizes not valid</Text>
         )}
      </VStack>
   )
}
