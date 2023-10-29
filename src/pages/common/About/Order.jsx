import React from 'react';
import { Box, VStack, Flex, Divider, chakra, Grid, GridItem, Container } from '@chakra-ui/react';
import Button from '@mui/material/Button';

function Feature({ heading, text }) {
  return (
    <GridItem>
      <chakra.h3 fontSize="2rem" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p fontSize="1.5rem">{text}</chakra.p>
    </GridItem>
  );
}

export default function ServiceBooking() {
  return (
    <Box
      as={Container}
      maxW="9xl"
      mt={14}
      p={4}
      style={{
        padding: '120px 16%',
      }}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1} marginBottom={50}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="4rem" fontWeight="700">
              Booking Our Services
            </chakra.h2>
            <Button to="/service" variant="contained" className="btn">
              Order Now
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              Provide your customers with a seamless and enjoyable experience when booking our
              services. Ensure your website's objectives are met, and pay attention to the
              user-friendly design and clear communication.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}
      >
        <Feature
          heading={'Service Booking'}
          text={'Book our services with ease and convenience.'}
        />
        <Feature
          heading={'Secure Payment'}
          text={'Enjoy secure and hassle-free payment options.'}
        />
        <Feature
          heading={'Order Tracking'}
          text={'Track your orders in real-time for peace of mind.'}
        />
        <Feature
          heading={'Customer Feedback'}
          text={'Share your valuable feedback to help us improve.'}
        />
      </Grid>
    </Box>
  );
}
