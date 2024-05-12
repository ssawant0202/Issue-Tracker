'use client'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextArea, TextField,  } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
const NewIssuesPage = () => {
  return (
    <div className='max-w-lg space-y-3'>
      <TextField.Root placeholder="Title">
      </TextField.Root>
      <SimpleMDE placeholder='Description'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuesPage