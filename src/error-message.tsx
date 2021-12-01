import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import tissueSvg from '../images/tissue.svg';
import * as React from 'react';

export default function ErrorMessage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Image
        src={tissueSvg}
        alt="Empty toilet paper tissue"
        width={300}
        height={300}
      />
      <Typography mt={-4} mb={1} variant="h5" component="h2" textAlign="center">
        {`"Oops!...I Did It Again" - Britney Spears.`}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {`We're really sorry, but something went wrong. Try refreshing the page.`}
      </Typography>
    </Box>
  );
}
