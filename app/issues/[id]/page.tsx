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
    <Grid columns={{initial:"1", md:"2"}} gap="3" rows="1" width = "auto">
        <Box>
        <IssueDetails issue={issue}/>
        </Box>
        <Box>
         <EditIssueButton issueId={issue.id}/>
        </Box>
        
    </Grid>
  )
}

export default IssueDetailPage