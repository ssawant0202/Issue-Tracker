
'use client';
import {QueryClient, QueryClientProvider as Reactcqp} from '@tanstack/react-query'
import { PropsWithChildren } from 'react';


const queryClient = new QueryClient();
const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <Reactcqp client = {queryClient}>
        {children}
    </Reactcqp>
  )
}

export default QueryClientProvider
