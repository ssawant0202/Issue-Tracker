'use client';
import Link from 'next/link'
import React from 'react'
import { TiCode } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const {status, data: session} = useSession(); // data property is renamed to session

    
    
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues/list'},
        // {
        //   label: status === 'authenticated'? session.user?.name: status === 'loading'? 'Loading...': 'Login',
        //   href: status === 'authenticated'? '/profile': '/api/auth/signin'
        // },

        
    ]
  return (
    <nav className='border-b px-5 mb-5  py-3'>
      <Container className="w-full">
        <Flex justify = "between"  >
          <Flex align = "center" gap = "2" > 
          <Link href="/"><TiCode /></Link>
          <ul className='flex space-x-6'>
            {links.map(link => 
            <Link key = {link.href} 
            className={classNames({
              'text-amber-500': link.href === currentPath,
              'text-zinc-500': link.href!!=currentPath,
              'hover:text-zinc-800 transition-colors':true
            })}
            href = {link.href}>{link.label}</Link> )}
          </ul>
          </Flex>

          <Box>
            {
            status === "authenticated" && (<Link href = "/api/auth/signout"> Log out</Link>)
            }
            {status === "unauthenticated" && (<Link href = "/api/auth/signin"> Login</Link>)}
          </Box>
        </Flex>
        </Container>
        
    </nav>
  )
}

export default NavBar