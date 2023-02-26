export function sumMatrix(
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

export function StrArrayToNumber(entry: Array<string>) {
   return entry.map((v) => Number(v))
}

export function generateMatrix(rows: number, columns: number): Array<string> {
   return new Array(rows * columns).fill('')
}
