import { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Field } from '@/features/Matrix/pages'
import {
   Heading,
   HStack,
   IconButton,
   Input,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react'
import { StrArrayToNumber } from '../utils/index'
import { sumArrays } from '@/features/Matrix/utils'
import { useMatrix } from '@/features/Matrix/hooks'
import { MatrixContainer } from '@/features/Matrix/components/MatrixContainer'
import { FieldText } from '@/features/Matrix/components/FieldText'

interface SumMatrixesProps {
   field: Field
   mod: number | undefined
}

export function SumMatrixes({ field, mod }: SumMatrixesProps) {
   const [rows, setRows] = useState('2')
   const [columns, setColumns] = useState('2')
   const [matrixA, onMatrixAChange] = useMatrix(Number(rows), Number(columns))
   const [matrixB, onMatrixBChange] = useMatrix(Number(rows), Number(columns))

   const a = StrArrayToNumber(matrixA)
   const b = StrArrayToNumber(matrixB)
   const result = sumArrays(a, b, mod)

   return (
      <VStack spacing={10}>
         <Heading fontSize='2xl'>
            Sum matrixes {mod && <FieldText mod={mod} />}
         </Heading>
         <HStack>
            <Input
               w={20}
               value={rows}
               type='number'
               min={0}
               onChange={(e) => setRows(e.target.value)}
            />

            <Text>X</Text>

            <Input
               w={20}
               value={columns}
               min={0}
               type='number'
               onChange={(e) => setColumns(e.target.value)}
            />
         </HStack>

         <Stack
            direction={{
               base: 'column',
               md: 'row',
            }}
            spacing={5}
            alignItems='center'
            gap={5}
            flexWrap='wrap'
            justifyContent='center'
         >
            <MatrixContainer
               rows={rows}
               columns={columns}
               values={matrixA}
               onCellChange={onMatrixAChange}
               field={field}
               mod={mod}
            />

            <IconButton aria-label='Sum' icon={<AddIcon />} />

            <MatrixContainer
               rows={rows}
               columns={columns}
               values={matrixB}
               onCellChange={onMatrixBChange}
               field={field}
               mod={mod}
            />
         </Stack>

         <MatrixContainer
            rows={rows}
            columns={columns}
            values={result}
            field={field}
            mod={mod}
         />
      </VStack>
   )
}
