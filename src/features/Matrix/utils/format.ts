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
