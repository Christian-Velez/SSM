import { useEffect, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Field } from '@/features/Matrix/pages'
import { HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
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
         <HStack>
            <Input
               w={20}
               value={rows}
               onChange={(e) => setRows(e.target.value)}
            />

            <Text>X</Text>

            <Input
               w={20}
               value={columns}
               onChange={(e) => setColumns(e.target.value)}
            />
         </HStack>

         <HStack spacing={5}>
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
         </HStack>

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
