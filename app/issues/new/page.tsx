'use client'
import axios from 'axios'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextArea, TextField,  } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import{useForm, Controller} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';

interface IssueForm{
  title: string; 
  description: string;
}
const NewIssuesPage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const[error, setError] = useState('');
  return (
    <div className='max-w-lg space-y-3'>
      {
        error && <Callout.Root className='mb-5' color = "red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
    <form  
    onSubmit = {handleSubmit( async(data)=> {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        setError('An unexpected error occoured.');
      }
      })}>
      <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
      <Controller 
        name = "description"
        control = {control}
        render = {({field})=> <SimpleMDE placeholder='Description' {...field}/> }
        />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuesPage