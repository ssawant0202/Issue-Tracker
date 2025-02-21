import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text} from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue} : {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
    <Flex gap="2" gapY="2">
        {/* <IssueStatusBadge status={issue.status}/> */}
        <Text size='2' mb='3' color="gray">{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className='prose max-w-full'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueDetails