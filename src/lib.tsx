import { Box, ButtonProps, Fab, Typography } from '@mui/material';
import Image from 'next/image';
import tissueSvg from '../images/tissue.svg';
import * as React from 'react';
import { Downloading, EmojiEvents } from '@mui/icons-material';

export function ErrorMessage() {
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

export function LoadMoreButton({ onClick }: ButtonProps) {
  return (
    <Fab color="primary" variant="extended" onClick={onClick}>
      <Downloading sx={{ mr: 1 }} />
      Load more
    </Fab>
  );
}

export function NoMoreEntriesMessage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <EmojiEvents sx={{ fontSize: 32 }} />
      <Typography variant="body1" color="text.secondary">
        {`You've seen it all, there is nothing more, well done!`}
      </Typography>
    </Box>
  );
}
