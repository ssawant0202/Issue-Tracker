'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { useRouter } from 'next/navigation';



const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color = 'red'>
            <TrashIcon/>
            Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title className="AlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialog.Description>
        <Flex mt = '1rem' gap='2'>
        <AlertDialog.Cancel>
            <Button variant = 'soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' onClick={async ()=>{
              await axios.delete('/api/issues/' + issueId);
              router.push('/issues');
              router.refresh();
            }}>Yes, delete account</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

  )
}

export default DeleteIssueButton