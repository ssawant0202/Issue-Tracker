import { Box, Card, Flex } from '@radix-ui/themes';
import {Skeleton} from '@/components';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton/>
        <Flex gap="2" gapY="2">
        <Skeleton width = "5rem"/>
        <Skeleton width = "5rem"/>
        </Flex>
        <Card className='prose'>
        <Skeleton count={3}/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage