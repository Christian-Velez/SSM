import { inverseAdditive, modularInverse } from '@/features/FiniteFields/utils'

function generateMatrix(rows: number, columns: number) {
   return Array.from(Array(rows), () => new Array(columns))
}

export function sumArrays(
   a: Array<number>,
   b: Array<number>,
   modulus?: number
) {
   const result = new Array(a.length)

   for (let i = 0; i < a.length; i++) {
      if (modulus === undefined) {
         result[i] = a[i] + b[i]
      } else {
         result[i] = (a[i] + b[i]) % modulus
      }
   }

   return result
}

export function multiplyMatrixes(
   a: Array<Array<number>>,
   b: Array<Array<number>>,
   modulus?: number
) {
   const rowsA = a.length
   const columnsA = a[0].length
   const columnsB = b[0].length
   const result: Array<Array<number>> = generateMatrix(rowsA, columnsB)

   for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < columnsB; c++) {
         result[r][c] = 0

         for (let i = 0; i < columnsA; i++) {
            let value = a[r][i] * b[i][c]

            if (modulus === undefined) {
               result[r][c] += value
            } else {
               value = value % modulus
               result[r][c] = (result[r][c] + value) % modulus
            }
         }
      }
   }

   return result
}

function generateExtendedMatrix(entry: Array<Array<number>>) {
   const rows = entry.length
   const columns = entry[0].length
   const extended = generateMatrix(rows, columns * 2)

   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
         extended[r][c] = entry[r][c]
      }
   }

   for (let r = 0; r < rows; r++) {
      for (let c = columns; c < extended[0].length; c++) {
         if (r === c - columns) {
            extended[r][c] = 1
         } else {
            extended[r][c] = 0
         }
      }
   }

   return extended
}

function multiplyRow_Infinite(row: Array<number>, factor: number) {
   const size = row.length
   for (let i = 0; i < size; i++) {
      row[i] = row[i] * factor
   }
}

function multiplyRow_Finite(
   row: Array<number>,
   factor: number,
   modulus: number
) {
   const size = row.length

   for (let i = 0; i < size; i++) {
      row[i] = (row[i] * factor) % modulus
   }
}

function transformRowBasedOnPivot_Infinite(
   row: Array<number>,
   pivotRow: Array<number>,
   inverseAdd: number
) {
   const size = row.length

   for (let i = 0; i < size; i++) {
      row[i] = row[i] + inverseAdd * pivotRow[i]
   }
}

function transformRowBasedOnPivot_Finite(
   row: Array<number>,
   pivotRow: Array<number>,
   inverseAdd: number,
   modulus: number
) {
   const size = row.length

   for (let i = 0; i < size; i++) {
      row[i] = (row[i] + inverseAdd * pivotRow[i]) % modulus
   }
}

export function inverseMatrix(a: Array<Array<number>>, modulus?: number) {
   const rows = a.length
   const columns = a[0].length
   const extended = generateExtendedMatrix(a)

   for (let pivot = 0; pivot < rows; pivot++) {
      if (modulus === undefined) {
         const factor = 1.0 / extended[pivot][pivot]
         multiplyRow_Infinite(extended[pivot], factor)
      } else {
         const factor = modularInverse(
            extended[pivot][pivot],
            modulus
         ) as number
         multiplyRow_Finite(extended[pivot], factor, modulus)
      }

      let i = 0

      while (i < rows) {
         if (i === pivot) {
            // skip pivot row
            i++
            if (i >= rows) continue
         }

         if (modulus === undefined) {
            const inverseAdd = -extended[i][pivot]
            transformRowBasedOnPivot_Infinite(
               extended[i],
               extended[pivot],
               inverseAdd
            )
         } else {
            const inverseAdd = inverseAdditive(extended[i][pivot], modulus)
            transformRowBasedOnPivot_Finite(
               extended[i],
               extended[pivot],
               inverseAdd,
               modulus
            )
         }

         i++
      }
   }

   const result = generateMatrix(rows, columns)
   for (let r = 0; r < rows; r++) {
      for (let c = columns; c < extended[0].length; c++) {
         result[r][c - columns] = extended[r][c]
      }
   }

   return result
}
