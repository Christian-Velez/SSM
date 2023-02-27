import { Field } from '@/features/Matrix/pages'
import { Box, Grid, Input } from '@chakra-ui/react'

interface MatrixProps {
   rows: string
   columns: string
   values: Array<string>
   field: Field
   mod: number | undefined
   onCellChange?: (value: string, index: number) => void
   cellSize?: string
}

function formatValue(value: string) {
   const asNum = Number(value)
   const remainder = Math.abs(asNum) % 1

   if (remainder === 0) return value

   return asNum.toFixed(2).toString()
}

export function Matrix({
   rows,
   columns,
   values,
   onCellChange,
   field,
   mod,
   cellSize = '50px',
}: MatrixProps) {
   const readOnly = !Boolean(onCellChange)
   let max: number

   if (field === 'finite' && mod !== undefined) {
      max = mod - 1
   }

   return (
      <Box>
         <Grid
            templateColumns={`repeat(${columns}, ${cellSize})`}
            templateRows={`repeat(${rows}, ${cellSize})`}
         >
            {values.map((value, i) => {
               let v = value

               if (readOnly) {
                  v = formatValue(value)
               }

               return (
                  <Input
                     disabled={readOnly}
                     key={i}
                     border='1px'
                     p={0}
                     h='full'
                     w='full'
                     borderColor='blue.200'
                     borderRadius='none'
                     display='flex'
                     justifyContent='center'
                     alignItems='center'
                     textAlign='center'
                     value={v}
                     type='number'
                     onChange={(e) => {
                        onCellChange && onCellChange(e.target.value, i)
                     }}
                     min={field === 'finite' ? 0 : ''}
                     max={max}
                  />
               )
            })}
         </Grid>
      </Box>
   )
}
