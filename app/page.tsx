import Pagination from "@/components/Pagination"
import { useSearchParams } from "next/navigation";

interface Props{
  page:number;
}
export default function Home({searchParams}: {searchParams: {page : string}}) {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
  )
}
