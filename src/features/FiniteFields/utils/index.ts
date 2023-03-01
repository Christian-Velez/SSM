export function inverseAdditive(a: number, m: number): number {
   if (a === 0) return 0

   return m - a
}

export function modularInverse(A: number, M: number): number | string {
   if (A >= M) {
      return `Number ${A} not allowed in Z${M}`
   }

   for (let X = 1; X < M; X++) if (((A % M) * (X % M)) % M === 1) return X

   return 1
}

export function mod(A: number, M: number): number {
   const result = A % M
   return result < 0 ? result + M : result
}
