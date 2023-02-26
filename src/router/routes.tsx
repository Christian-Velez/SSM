import { Landing } from '@/features/misc'
import { Layout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'
import { Outlet, Navigate } from 'react-router-dom'
import { Suspense } from 'react'

const { VigenereCipher } = lazyImport(
   () => import('@/features/VigenereCipher'),
   'VigenereCipher'
)

const { FiniteFields } = lazyImport(
   () => import('@/features/FiniteFields'),
   'FiniteFields'
)

const { Matrix } = lazyImport(() => import('@/features/Matrix'), 'Matrix')

function App() {
   return (
      // TODO: Fallback
      <Suspense fallback={null}>
         <Layout>
            <Outlet />
         </Layout>
      </Suspense>
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
      element: <FiniteFields />,
   },
   {
      path: '/matrix',
      element: <Matrix />,
   },
]

export const routes = [
   {
      path: '/',
      element: <App />,
      children: appRoutes,
   },
   {
      path: '*',
      element: <Navigate to='/' />,
   },
]
