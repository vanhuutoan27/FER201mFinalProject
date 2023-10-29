import { Box, Heading, Text } from '@chakra-ui/react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div
      className="ErrorPage"
      style={{ backgroundColor: 'var(--primary-color-2)', height: '100vh' }}
    >
      <Box textAlign="center" py={120} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="10xl"
          bgGradient="linear(to-r, var(--primary-color-1), var(--primary-color-5))"
          backgroundClip="text"
          style={{ fontSize: '10rem' }}
        >
          404
        </Heading>
        <Text
          fontSize="18px"
          mb={2}
          style={{ color: 'var(--primary-color-0)', fontSize: '3rem', fontWeight: 'bold' }}
        >
          Page Not Found
        </Text>
        <Text color={'var(--primary-color-0)'} mb={12}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <Link to="/">
          <Button variant="contained" className="btn">
            Go to Home
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default Error404;
