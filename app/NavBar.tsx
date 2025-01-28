'use client';
import Link from 'next/link'
import React from 'react'
import { TiCode } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
  const {status, data: session} = useSession(); // data property is renamed to session

    
    
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues/list'},
        // {
        //   label: status === 'authenticated'? session.user?.name: status === 'loading'? 'Loading...': ' ',
        //   href: status === 'authenticated'? '/profile': '/api/auth/signin'
        // },
    ]
  return (
    <nav className='border-b px-5 mb-5  py-3'>
      {/* <Container> */}
        <Flex justify = "between">
          <Flex align = "center" gap = "2" > 
          <Link href="/"><TiCode /></Link>
          <ul className='flex space-x-6'>
            {links.slice(0, links.length).map(link => 
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
            status === "authenticated" && (
              <>
              <Flex align = "center" gap = "3" >
              <Link href = "/profile" className={classNames({
              'text-amber-500': "/profile" === currentPath,
              'text-zinc-500': "/profile"!!=currentPath,
              'hover:text-zinc-800 transition-colors':true
            })}> {session.user?.name}</Link>
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar 
                  src = {session.user?.image!} 
                  fallback = "!" 
                  size = "2" 
                  className = "cursor-pointer"
                  referrerPolicy = "no-referrer"
                  radius = "full"/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size = "2">
                    {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href = "/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              </Flex>
              </>
            )
            }
            {status === "unauthenticated" && (<Link href = "/api/auth/signin" color="gray"> Login</Link>)}
          </Box>
        </Flex>
      {/* </Container> */}
        
    </nav>
  )
}


export default NavBar