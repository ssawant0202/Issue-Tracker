import { IssueStatusBadge, Link } from '@/components';
import prisma from '@/prisma/client';
import { Container, Table } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';

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
    // <LatestIssues/>
    <IssueSummary open = {open} inProgress={inProgress} closed={closed}/>
  )
}
