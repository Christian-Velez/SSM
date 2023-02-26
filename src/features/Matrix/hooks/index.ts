import { generateMatrix } from '@/features/Matrix/utils'
import { useState, useEffect, useCallback } from 'react'

type UseMatrixReturn = [
   value: Array<string>,
   onCellChange: (v: string, i: number) => void,
   setValue: (v: Array<string>) => void
]

export function useMatrix(rows: number, columns: number): UseMatrixReturn {
   const [matrix, setMatrix] = useState<Array<string>>([])

   function onCellChange(value: string, index: number) {
      setMatrix((prev) => {
         return prev.map((v, i) => {
            if (i !== index) return v

            return value
         })
      })
   }

   useEffect(() => {
      const matrix = generateMatrix(rows, columns)
      setMatrix(matrix)
   }, [rows, columns])

   const set = useCallback((value: Array<string>) => {
      setMatrix(value)
   }, [])

   return [matrix, onCellChange, set]
}
