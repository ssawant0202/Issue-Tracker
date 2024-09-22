import IssueStatusBadge from '@/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Heading, Text, Flex, Card, Grid, Box, Button} from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { parse } from 'postcss'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon} from '@radix-ui/react-icons';
import Link from 'next/link'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
interface Props{
    params:{ id: string}
}

const IssueDetailPage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!issue)
        notFound();

  return (
    <Grid columns={{initial:"1", md:"5"}} gap="3" rows="1" width = "auto">
        <Box className='col-span-4'>
        <IssueDetails issue={issue}/>
        </Box>
        <Box>
        <Flex direction = "column" gap = '4'>
            
            <EditIssueButton issueId={issue.id}/>
            <DeleteIssueButton issueId={issue.id}/>
            
        </Flex>
        </Box>    
        
    </Grid>
  )
}

export default IssueDetailPage