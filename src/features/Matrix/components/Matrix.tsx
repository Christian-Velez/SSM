import { Field } from '@/features/Matrix/pages'
import { Box, Grid, Input } from '@chakra-ui/react'

interface MatrixProps {
   rows: string
   columns: string
   values: Array<string>
   field: Field
   mod: number | undefined
   onCellChange?: (value: string, index: number) => void
}

export function Matrix({
   rows,
   columns,
   values,
   onCellChange,
   field,
   mod,
}: MatrixProps) {
   let max: number

   if (field === 'finite' && mod !== undefined) {
      max = mod - 1
   }

   return (
      <Box>
         <Grid
            templateColumns={`repeat(${columns}, 50px)`}
            templateRows={`repeat(${rows}, 50px)`}
         >
            {values.map((value, i) => (
               <Input
                  disabled={!Boolean(onCellChange)}
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
                  value={value}
                  type='number'
                  onChange={(e) => {
                     onCellChange && onCellChange(e.target.value, i)
                  }}
                  min={field === 'finite' ? 0 : ''}
                  max={max}
               />
            ))}
         </Grid>
      </Box>
   )
}
