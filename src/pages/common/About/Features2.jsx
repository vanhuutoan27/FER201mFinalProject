import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={36}
        h={36}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={2}
      >
        {icon}
      </Flex>
      <Text fontSize="2rem" fontWeight={600} color={'var(--primary-color-1)'}>
        {title}
      </Text>
      <Text color={'#fff'}>{text}</Text>
    </Stack>
  );
};

function Features2() {
  return (
    <Box
      p={4}
      style={{
        background: 'var(--primary-color-2)',
        padding: '80px 16%',
      }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={10}
        style={{
          marginLeft: '6%',
        }}
      >
        <Feature
          icon={<Icon as={FcAssistant} w={20} h={20} />}
          title={'Lifetime Support'}
          text={
            'We provide lifetime support to ensure you have the best experience. Our team is always here to assist you with any questions or issues.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={20} h={20} />}
          title={'Unlimited Donations'}
          text={
            'With us, you can make unlimited donations to support causes you care about. We believe in the power of giving.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={20} h={20} />}
          title={'Instant Delivery'}
          text={
            'Enjoy instant delivery of your contributions. Your support reaches the people and organizations in need without delay.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}

export default Features2;
