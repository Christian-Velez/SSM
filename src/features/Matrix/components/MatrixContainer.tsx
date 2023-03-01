import { Matrix, MatrixProps } from '@/features/Matrix/components/Matrix'
import { AttachmentIcon, CopyIcon } from '@chakra-ui/icons'
import { HStack, IconButton, useToast, VStack } from '@chakra-ui/react'

type MatrixContainerProps = {} & MatrixProps

export function MatrixContainer({
   rows,
   columns,
   values,
   onCellChange,
   field,
   mod,
}: MatrixContainerProps) {
   const canBeEdited = Boolean(onCellChange)
   const toast = useToast()

   async function copy() {
      const text = values.join(',')

      try {
         await navigator.clipboard.writeText(text)
         toast({
            title: 'Matrix copied to clipboard',
            status: 'success',
         })
      } catch (e) {
         toast({
            title: 'Error trying to copy',
            status: 'error',
         })
      }
   }

   async function paste() {
      if (!canBeEdited) return

      const text = await navigator.clipboard.readText()
      if (!text.includes(',')) return

      const arr = text.split(',')
      if (!arr?.length) return

      const numElements = arr.length

      let i = 0
      while (i < numElements && arr[i]) {
         onCellChange && onCellChange(arr[i], i)
         i++
      }

      toast({
         title: 'Pasted from clipboard',
         status: 'success',
      })
   }

   return (
      <HStack alignItems='stretch'>
         <Matrix
            rows={rows}
            columns={columns}
            values={values}
            onCellChange={onCellChange}
            field={field}
            mod={mod}
         />

         <VStack justify='start'>
            <IconButton
               size='sm'
               variant='outline'
               aria-label='copy'
               icon={<CopyIcon />}
               onClick={copy}
            />

            {canBeEdited && (
               <IconButton
                  size='sm'
                  variant='outline'
                  aria-label='paste'
                  icon={<AttachmentIcon />}
                  onClick={paste}
               />
            )}
         </VStack>
      </HStack>
   )
}
