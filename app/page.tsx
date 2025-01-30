import { IssueStatusBadge, Link } from '@/components';
import prisma from '@/prisma/client';
import { Container, Flex, Grid, Table } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';
import { Metadata } from 'next';

interface Props{
  page:number;
}
export default async function Home({searchParams}: {searchParams: {page : string}}) {
  const open = await prisma.issue.count({
    where: {status: 'OPEN'}
  });

  const closed = await prisma.issue.count({
    where: {status: 'CLOSED'}
  });
  
  const inProgress = await prisma.issue.count({
    where: {status: 'IN_PROGRESS'}
  });
  

  return (
    
    <Grid columns={{initial:"1", md: "2"} } gap = '5'>
      <Flex direction = "column" gap = '5'>
        <IssueSummary open = {open} inProgress={inProgress} closed={closed}/>
        <IssueChart open = {open} inProgress={inProgress} closed={closed}/>
      </Flex>
      <LatestIssues/>
    </Grid>

  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard', 
  description: 'View a summary fo project issues'
};
