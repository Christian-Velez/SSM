import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
   IconButton,
   Input as ChakraInput,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'

export type FieldProps = {
   value?: string | number | readonly string[] | undefined
   onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
   type?: React.HTMLInputTypeAttribute
}

export const Field = ({ value, onChange, type }: FieldProps) => {
   const [show, setShow] = useState(false)

   if (type === 'password') {
      return (
         <InputGroup size='md'>
            <ChakraInput
               pr='4.5rem'
               type={show ? 'text' : 'password'}
               placeholder='Enter password'
            />

            <InputRightElement width='4.5rem'>
               <IconButton
                  aria-label='toggle visibility'
                  h='1.75rem'
                  variant='unstyled'
                  fontSize='1.4rem'
                  size='sm'
                  onClick={() => setShow((s) => !s)}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
               />
            </InputRightElement>
         </InputGroup>
      )
   }

   return <ChakraInput value={value} onChange={onChange} type={type} />
}
