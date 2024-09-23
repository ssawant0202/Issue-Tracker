'use client'
import { createIssueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuesPage = ({issue}:{issue?:Issue}) => {
  //  await delay(2000)
  const router = useRouter();
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const[error, setError] = useState('');
  const[isSubmitting, setSubmitting] = useState(false);
  return (
    <div className='max-w-lg space-y-3'>
      {
        error && <Callout.Root className='mb-5' color = "red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
    <form  
    onSubmit = {handleSubmit( async( data)=> {
      try {
        setSubmitting(true);
        if(issue)
          await axios.patch('/api/issues/' + issue.id, data);
        else
          await axios.post('/api/issues', data);

        router.push('/issues/list');
        router.refresh();
      } catch (error) {
        setSubmitting(false);
        setError('An unexpected error occoured.');
      }
      })}>
      <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}></TextField.Root>
      <ErrorMessage>
        {errors.title?.message}
      </ErrorMessage>
      <Controller 
        name = "description"
        control = {control}
        defaultValue={issue?.description}
        render = {({field})=> <SimpleMDE placeholder='Description' {...field}/> }
        />
        <ErrorMessage>
        {errors.description?.message}
      </ErrorMessage>
      <Button disabled = {isSubmitting}>{issue? 'Update Issue':'Submit New Issue'}{' '}
        {isSubmitting && <Spinner/>}
        </Button>
    </form>
    </div>
  )
}

export default NewIssuesPage