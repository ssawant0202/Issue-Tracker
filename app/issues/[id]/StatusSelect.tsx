'use client';
import React, { useEffect, useState } from 'react'
import {Select, Skeleton} from '@radix-ui/themes'
import { Issue, Status, User } from '@prisma/client';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import toast, {Toaster} from 'react-hot-toast';
import { IssueStatusBadge } from '@/components';

const statusOptions: Status[] = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
const StatusSelect = ({issue}:{issue:Issue}) => {

// const {data: users, error, isLoading} = useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: ()=> axios.get('/api/users').then(res=>res.data),
//     staleTime: 60 * 1000,
//     retry: 3
// });



// if(isLoading) return <Skeleton></Skeleton>
// if(error) return null;
  return (
    <>
    <Select.Root 
        defaultValue={issue.status}
        onValueChange={(newStatus) => {
        axios
        .patch('/api/issues/' + issue.id, { status: newStatus === "null" ? null : newStatus })
        .catch(()=> {
            toast.error('Status change could not be saved!')
        });
      
    }}>
        <Select.Trigger placeholder='Select Status...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Current Status</Select.Label>
                {/* <Select.Item value="null">{issue.status}</Select.Item> */}
                {statusOptions.map((status) => (
                    <Select.Item key={status} value = {status}>
                        <IssueStatusBadge status={status} />
                    </Select.Item>
                ))}
                
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  )
}

export default StatusSelect
