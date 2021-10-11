import { Box, Container, Text } from '@chakra-ui/react'

const Hero = () => {
  return (
    <Box borderTop="1px solid #E3E1E3">
      <Container display='flex' alignItems='center'  maxW='container.lg' py='6'>
        <Text fontWeight='semibold'>StudyWithMe, Inc. All Rights Reserved</Text>
      </Container>
    </Box>
  );
};

export default Hero;
