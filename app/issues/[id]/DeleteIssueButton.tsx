'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React, { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components';



const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteIssue = async ()=>{
    try {
      setDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues/list');
      router.refresh();
    }
    catch (error){
      setError(true);
      setDeleting(false);
    }
  }
  return (
      <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color = 'red' disabled={isDeleting}>
            <TrashIcon/>
            Delete Issue
            {isDeleting && <Spinner/>}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title className="AlertDialogTitle">Delete this issue?</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          This action cannot be undone. This will permanently delete the current issue from our servers.
        </AlertDialog.Description>
        <Flex mt = '1rem' gap='2'>
        <AlertDialog.Cancel>
            <Button variant = 'soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'  onClick={deleteIssue}>Yes, delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title className="AlertDialogTitle">Error!</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          There was a problem deleting this issue.
        </AlertDialog.Description>
        <AlertDialog.Cancel>
            <Button color='gray' mt = "2" onClick={()=>{setError(false)}}>OK</Button>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton