import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'15'}
      shadow={'xl'}
      border={'4px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      style={{
        borderColor: 'var(--primary-color-2)',
      }}
    >
      <StatLabel
        fontSize={'2.4rem'}
        fontWeight={'bold'}
        isTruncated
        style={{ color: 'var(--primary-color-1)' }}
      >
        {title}
      </StatLabel>
      <StatNumber fontSize={'2rem'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

function Statistics() {
  return (
    <Box
      maxW="9xl"
      mx={'auto'}
      py={12}
      px={{ base: 2, sm: 12, md: 17 }}
      style={{
        padding: '120px 16%',
      }}
    >
      <chakra.h1
        textAlign={'center'}
        fontSize={'4rem'}
        marginBottom="12px"
        fontWeight={'bold'}
        color={'var(--primary-color-2)'}
      >
        What We Offer
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 10 }}>
        <StatsCard title={'Quality Services'} stat={'Delivering the best services.'} />
        <StatsCard title={'Global Reach'} stat={'Serving customers in over 30 countries.'} />
        <StatsCard title={'Diversity'} stat={'Supporting 100 different languages.'} />
      </SimpleGrid>
    </Box>
  );
}

export default Statistics;
