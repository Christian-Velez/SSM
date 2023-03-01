import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react'
import { FieldProps, Field } from './Field'

type InputProps = FieldProps & {
   helperText?: string
   label: string
}

export const Input = ({
   helperText,
   label,
   value,
   onChange,
   type = 'text',
}: InputProps) => {
   return (
      <FormControl>
         <FormLabel>{label}</FormLabel>

         <Field value={value} onChange={onChange} type={type} />

         {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
   )
}
