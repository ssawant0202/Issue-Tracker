import './theme-config.css'
import '@radix-ui/themes/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import{Theme, ThemePanel} from '@radix-ui/themes'
import NavBar from './NavBar'
import AuthProvider from './api/auth/Provider'
import QueryClientProvider from './QueryClientProvider'


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
 })

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'An app to track issues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      
      <QueryClientProvider>
      <AuthProvider>
      <Theme accentColor="orange" grayColor="gray" radius="full" scaling="110%">
        <NavBar />
        <main className='p-5'>{children}</main>
        {/* <ThemePanel /> */}
        </Theme>
        </AuthProvider>
        </QueryClientProvider>
      
      </body>
    </html>
  )
}
