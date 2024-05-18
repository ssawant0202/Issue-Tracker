'use client'
import dynamic from 'next/dynamic';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { Text, TextArea, TextField,  } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import{useForm, Controller} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import { validationSchema }  from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import  ErrorMessage  from '@/components/ErrorMessage'
import  Spinner  from '@/components/Spinner'



const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  {ssr: false}

);
//this automatically creates the interface issueform
type IssueForm = z.infer<typeof validationSchema>;
// interface IssueForm{
//   title: string; 
//   description: string;
// }


const NewIssuesPage = () => {
  // await delay(2000)
  const router = useRouter();
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(validationSchema)
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
    onSubmit = {handleSubmit( async(data)=> {
      try {
        setSubmitting(true);
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        setSubmitting(false);
        setError('An unexpected error occoured.');
      }
      })}>
      <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
      <ErrorMessage>
        {errors.title?.message}
      </ErrorMessage>
      <Controller 
        name = "description"
        control = {control}
        render = {({field})=> <SimpleMDE placeholder='Description' {...field}/> }
        />
        <ErrorMessage>
        {errors.description?.message}
      </ErrorMessage>
      <Button disabled = {isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewIssuesPage