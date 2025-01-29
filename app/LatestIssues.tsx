import { IssueStatusBadge } from '@/components';
import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Link, Table } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes/dist/esm/components/callout.js';
import React from 'react'

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({ 
        take: 5,
        include: {
            assignedToUser: true, // This tells Prisma to include the related `User` record
          },
    });

    return (
        <div>
        <Heading align="left" size='6'ml='2' mb='3'>Latest Issues</Heading>
        <Card variant='surface'>
        <Table.Root>
            <Table.Body>
                {issues.map( issue => (
                    <Table.Row key = {issue.id}>
                        <Table.Cell> 
                           {/* "column"	Arranges child elements vertically, from top to bottom. */}
                           <Flex justify={'between'}>
                            <Flex direction="column" align="start">
                                <Link color = 'gray' href = {`/issues/${issue.id}`}> {issue.title} </Link>
                                <IssueStatusBadge status={issue.status}/>
                            </Flex>
                            {issue.assignedToUser && (
                            <Avatar 
                                src={issue.assignedToUser.image!} 
                                fallback="?"
                                size="2"
                                radius="full"
                            />
                            )}
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        </Card>
        </div>
    )
}

export default LatestIssues
