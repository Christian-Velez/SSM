import { FieldText } from '@/features/Matrix/components/FieldText'
import { MatrixContainer } from '@/features/Matrix/components/MatrixContainer'
import { useMatrix } from '@/features/Matrix/hooks'
import { Field } from '@/features/Matrix/pages'
import { ArrToMatrix, rref, StrArrayToNumber } from '@/features/Matrix/utils'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
   Heading,
   HStack,
   IconButton,
   Input,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { matrixToArray } from '../utils/format'

interface RREFProps {
   field: Field
   mod: number | undefined
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

export function RREF({ field, mod }: RREFProps) {
   const [rowsA, setRowsA] = useState('2')
   const [columnsA, setColumnsA] = useState('2')
   const [matrixA, onMatrixAChange] = useMatrix(Number(rowsA), Number(columnsA))
   const [extendM, onExtendChange] = useMatrix(Number(rowsA), Number('1'))

   const m = format(matrixA, rowsA, columnsA)
   const extend = format(extendM, rowsA, '1')

   let result: Array<string> = []
   const isValid = Number(rowsA) !== 0

   if (isValid) {
      const rrefMatrix = rref(m, extend, mod)
      result = matrixToArray(rrefMatrix).map((v) => v.toString())
   }

   return (
      <VStack spacing={20}>
         <Heading fontSize='2xl'>
            Reduced Row Echelon Form {mod && <FieldText mod={mod} />}
         </Heading>

         <Stack
            gap={5}
            direction={{
               base: 'column',
               md: 'row',
            }}
            spacing={10}
            flexWrap='wrap'
            align='center'
         >
            <VStack spacing={10}>
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

               <MatrixContainer
                  rows={rowsA}
                  columns={columnsA}
                  values={matrixA}
                  onCellChange={onMatrixAChange}
                  field={field}
                  mod={mod}
               />
            </VStack>

            <IconButton aria-label='left' icon={<ArrowLeftIcon />} />

            <VStack spacing={10}>
               <Text>Extend with</Text>

               <MatrixContainer
                  rows={rowsA}
                  columns={'1'}
                  values={extendM}
                  onCellChange={onExtendChange}
                  field={field}
                  mod={mod}
               />
            </VStack>
         </Stack>

         <Text fontWeight='bold' textColor='teal.500'>
            RREF
         </Text>
         <MatrixContainer
            rows={rowsA}
            columns={(Number(rowsA) + 1).toString()}
            values={result}
            field={field}
            mod={mod}
         />
      </VStack>
   )
}
