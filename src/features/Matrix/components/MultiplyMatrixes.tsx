import { CloseIcon } from '@chakra-ui/icons'
import { Field } from '@/features/Matrix/pages'
import { HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { Matrix } from '@/features/Matrix/components/Matrix'
import { useMatrix } from '@/features/Matrix/hooks'
import { useState, useEffect } from 'react'
import {
   multiplyMatrixes,
   StrArrayToNumber,
   ArrToMatrix,
   sumMatrixes,
   matrixToArray,
} from '@/features/Matrix/utils'

interface MultiplyMatrixesProps {
   field: Field
   modulus: number
}

const MAX_MATRIX_SIZE = 5

export function MultiplyMatrixes({ field, modulus }: MultiplyMatrixesProps) {
   const [rowsA, setRowsA] = useState('2')
   const [columnsA, setColumnsA] = useState('2')
   const [matrixA, onMatrixAChange] = useMatrix(Number(rowsA), Number(columnsA))

   const [rowsB, setRowsB] = useState('2')
   const [columnsB, setColumnsB] = useState('2')
   const [matrixB, onMatrixBChange] = useMatrix(Number(rowsB), Number(columnsB))

   const [matrixR, _, setR] = useMatrix(Number(rowsA), Number(columnsB))

   const mod = field === 'finite' ? modulus : undefined
   const isValid = columnsA === rowsB

   useEffect(() => {
      if (!isValid) return

      const a = ArrToMatrix(
         StrArrayToNumber(matrixA),
         Number(rowsA),
         Number(columnsA)
      )
      const b = ArrToMatrix(
         StrArrayToNumber(matrixB),
         Number(rowsB),
         Number(columnsB)
      )

      const xd = multiplyMatrixes(a, b, mod)
      const x2 = matrixToArray(xd).map((n) => n.toString())
      setR(x2)
   }, [matrixA, matrixB, mod, isValid, rowsA, columnsA, rowsB, columnsB, setR])

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
               values={matrixR}
               field={field}
               mod={mod}
            />
         ) : (
            <Text>Matrixes sizes not valid</Text>
         )}
      </VStack>
   )
}
