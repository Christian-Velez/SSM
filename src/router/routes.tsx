import { Landing } from '@/features/misc'
import { Layout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'
import { Outlet } from 'react-router-dom'

const { VigenereCipher } = lazyImport(
   () => import('@/features/VigenereCipher'),
   'VigenereCipher'
)

function App() {
   return (
      <Layout>
         <Outlet />
      </Layout>
   )
}

const appRoutes = [
   {
      path: '/',
      element: <Landing />,
   },
   {
      path: '/vigenere-cipher',
      element: <VigenereCipher />,
   },
   {
      path: '/finite-fields',
      element: <h1>Finite fields: inverse aditive, modular inverse</h1>,
   },
   {
      path: '/matrix',
      element: (
         <h1>
            Matrix: multiply, sum, inverse matrix using gauss-jordan. Finite
            fields, Infinite Fields and Complex numbers
         </h1>
      ),
   },
]

export const routes = [
   {
      path: '/',
      element: <App />,
      children: appRoutes,
   },
]
