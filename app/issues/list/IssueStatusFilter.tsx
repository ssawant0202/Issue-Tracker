import React from 'react'
import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import { useRouter } from 'next/navigation';

const statuses : {label: string, value: Status}[] = [
    {label: 'All', value : 'ALL'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'}
]; 


const IssueStatusFilter = () => {
    const router = useRouter(); 
  return (
    <div>
        <Select.Root onValueChange={(status) => {
            if ( status === 'ALL')
                router.push('/issues/list'); //axios is used to send and receive data from backend while, router is used to navigate from one page to another
            else{
                const query = status? `?status=${status}`:'';
                router.push('/issues/list' + query);    
            }
            
        }}>
            <Select.Trigger placeholder='Filter by status...'/>
            <Select.Content>
                {statuses.map(status => <Select.Item key = {status.value} value = {status.value}>
                    {status.label}
                </Select.Item>)}
            </Select.Content>
        </Select.Root>
    </div>
  )
}

export default IssueStatusFilter
