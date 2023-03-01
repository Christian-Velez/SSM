import { Field } from '@/features/Matrix/pages'
import { Flex, Grid, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

export interface MatrixProps {
   cellSize?: string
   columns: string
   field: Field
   mod: number | undefined
   onCellChange?: (value: string, index: number) => void
   rows: string
   values: Array<string>
   color?: string
}

const bracketColor = 'var(--chakra-colors-blue-300)'
const bracketLine = '3px'
const bracketW = '10px'

const LeftBracket = styled.div`
   border-bottom: ${bracketLine} solid;
   border-left: ${bracketLine} solid;
   border-top: ${bracketLine} solid;
   border-color: ${(props) => props.color};
   position: relative;
   right: -${bracketW};
   width: ${bracketW};
`

const RightBracket = styled.div`
   border-bottom: ${bracketLine} solid;
   border-right: ${bracketLine} solid;
   border-top: ${bracketLine} solid;
   border-color: ${(props) => props.color};
   left: -${bracketW};
   position: relative;
   width: ${bracketW};
`

export function Matrix({
   cellSize = '100',
   columns,
   field,
   mod,
   onCellChange,
   rows,
   values,
}: MatrixProps) {
   const readOnly = !Boolean(onCellChange)
   let max: number

   if (field === 'finite' && mod !== undefined) {
      max = mod - 1
   }

   return (
      <Flex>
         <LeftBracket color={bracketColor} />
         <Grid
            templateColumns={`repeat(${columns}, ${cellSize}px)`}
            templateRows={`repeat(${rows}, ${cellSize}px)`}
            gap={1}
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
                     p={0}
                     h='full'
                     w='full'
                     borderRadius='none'
                     border='none'
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

         <RightBracket color={bracketColor} />
      </Flex>
   )
}

function formatValue(value: string): string {
   const DECIMAL_TOLERANCE = 0.000005
   const asNum = Number(value)
   const rounded = Math.round(asNum)

   if (Math.abs(asNum - rounded) < DECIMAL_TOLERANCE) {
      return rounded.toString()
   }

   const remainder = Math.abs(asNum) % 1
   if (remainder === 0) return value

   return asNum.toFixed(4).toString()
}
