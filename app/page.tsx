import { IssueStatusBadge, Link } from '@/components';
import prisma from '@/prisma/client';
import { Container, Table } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';

interface Props{
  page:number;
}
export default function Home({searchParams}: {searchParams: {page : string}}) {

  return (
    <LatestIssues/>
  )
}
