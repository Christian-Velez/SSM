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
import { Matrix } from '@/features/Matrix/components/Matrix'
import { StrArrayToNumber } from '../utils/index'
import { sumArrays } from '@/features/Matrix/utils'
import { useMatrix } from '@/features/Matrix/hooks'

interface SumMatrixesProps {
   field: Field
   modulus: number
}

export function SumMatrixes({ field, modulus }: SumMatrixesProps) {
   const [rows, setRows] = useState('2')
   const [columns, setColumns] = useState('2')
   const [matrixA, onMatrixAChange] = useMatrix(Number(rows), Number(columns))
   const [matrixB, onMatrixBChange] = useMatrix(Number(rows), Number(columns))

   const mod = field === 'finite' ? modulus : undefined

   const a = StrArrayToNumber(matrixA)
   const b = StrArrayToNumber(matrixB)
   const result = sumArrays(a, b, mod)

   return (
      <VStack spacing={10}>
         <Heading fontSize='lg'>Sum matrixes</Heading>
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
            <Matrix
               rows={rows}
               columns={columns}
               values={matrixA}
               onCellChange={onMatrixAChange}
               field={field}
               mod={mod}
            />

            <IconButton aria-label='Sum' icon={<AddIcon />} />

            <Matrix
               rows={rows}
               columns={columns}
               values={matrixB}
               onCellChange={onMatrixBChange}
               field={field}
               mod={mod}
            />
         </Stack>

         <Matrix
            rows={rows}
            columns={columns}
            values={result}
            field={field}
            mod={mod}
         />
      </VStack>
   )
}
