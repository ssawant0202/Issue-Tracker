import Pagination from "@/components/Pagination"
import { Container, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

interface Props{
  page:number;
}
export default function Home({searchParams}: {searchParams: {page : string}}) {
  return (
    
    <Text size="1" color= "gray"> Dashboard in progress...</Text>
    
  )
}
