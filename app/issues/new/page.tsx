'use client'
import axios from 'axios'
import SimpleMDE from "react-simplemde-editor";
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

//this automatically creates the interface issueform
type IssueForm = z.infer<typeof validationSchema>;
// interface IssueForm{
//   title: string; 
//   description: string;
// }


const NewIssuesPage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(validationSchema)
  });
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
      { errors.title && <Text className="mb-2" color="red" as="p">{errors.title.message}</Text>   }
      <Controller 
        name = "description"
        control = {control}
        render = {({field})=> <SimpleMDE placeholder='Description' {...field}/> }
        />
        {errors.description && <Text className="mb-2" color="red" as="p">{errors.description.message}</Text> }
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuesPage