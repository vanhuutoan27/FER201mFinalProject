import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
import { ReactElement } from 'react';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={20}
        h={20}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
        style={{ marginRight: '12px' }}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

function Features() {
  return (
    <Container
      maxW={'9xl'}
      py={12}
      style={{
        padding: '120px 16%',
      }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'2rem'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'lg'}
            style={{ padding: '0 20px' }}
          >
            Our Project
          </Text>
          <Heading style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            Enhancing Student Housing Services
          </Heading>
          <Text
            color={'gray.500'}
            fontSize={'lg'}
            style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '20px' }}
          >
            We are dedicated to delivering exceptional services for student housing facilities. Our
            mission is to make student life more comfortable and convenient.
          </Text>
          <Stack
            spacing={4}
            divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
          >
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={10} h={10} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Usage Analytics'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={10} h={10} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Cost Management'}
            />
            <Feature
              icon={<Icon as={IoSearchSharp} color={'purple.500'} w={10} h={10} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Service Tracking'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={'../../../assets/images/about-features.jpg'}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

export default Features;
