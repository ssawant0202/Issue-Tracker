'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import React from 'react'

interface Props{
    itemCount: number; 
    pageSize: number;
    currentPage: number; 
}
const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize); 
    const searchParams = useSearchParams();
    const router = useRouter();
    const changePage = (page : number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }
    if(pageCount <= 1) return null;
    return (
        <Flex justify = "center" align = "center" gap = "2" py="4" >
            <Button color="gray" variant="soft" disabled={currentPage === 1}
            onClick={()=>changePage(1)}>
                <DoubleArrowLeftIcon/>
            </Button>

            <Button color="gray" variant="soft" disabled={currentPage === 1}
            onClick={()=>changePage(currentPage - 1)}>
                <ChevronLeftIcon/>
            </Button>
            <Text size="1" color= "gray"> Page {currentPage} of {pageCount}</Text>
            <Button color="gray" variant="soft" disabled={currentPage === pageCount} 
            onClick={()=>changePage(currentPage + 1)}>
                <ChevronRightIcon/>
            </Button>

            <Button color="gray" variant="soft" disabled={currentPage === pageCount} 
            onClick={()=>changePage(pageCount)}>
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    )
}

export default Pagination
