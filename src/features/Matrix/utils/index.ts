export function sumMatrixes(
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
   console.clear()
   const rowsA = a.length
   const columnsA = a[0].length
   const columnsB = b[0].length

   const result: Array<Array<number>> = Array.from(
      Array(rowsA),
      () => new Array(columnsB)
   )

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

export function StrArrayToNumber(entry: Array<string>) {
   return entry.map((v) => Number(v))
}

export function ArrToMatrix(
   arr: Array<number>,
   rows: number,
   columns: number
): Array<Array<number>> {
   let index = 0
   const result: Array<Array<number>> = []

   for (let r = 0; r < rows; r++) {
      result.push([])
      for (let c = 0; c < columns; c++) {
         result[r][c] = arr[index++]
      }
   }

   return result
}

export function matrixToArray(matrix: Array<Array<number>>): Array<number> {
   return matrix.flatMap((num) => num)
}

export function generateMatrix(rows: number, columns: number): Array<string> {
   return new Array(rows * columns).fill('')
}
