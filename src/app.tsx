import {
  Container,
  Divider,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import useSWR from 'swr';
import * as React from 'react';
import TimelineEntries from 'src/timeline-entries';
import ErrorMessage from './error-message';
import GithubCorner from 'react-github-corner';
import { GetTimelineEntriesResponse } from './get-timeline-entries';

export default function App() {
  const theme = useTheme();
  const {
    data: timelineEntries,
    hasMore,
    nextCursor,
    isError,
    isLoading,
  } = useTimelineEntries();

  console.log({ hasMore, nextCursor });

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <GithubCorner
        href="https://github.com/sitek94/timeline"
        bannerColor={theme.palette.primary.contrastText}
        octoColor={theme.palette.background.paper}
        size={80}
        direction="left"
      />
      <Paper sx={{ minHeight: '100vh' }} square>
        <Typography
          variant="h2"
          component="h1"
          textAlign={{ xs: 'left', sm: 'center' }}
          p={4}
        >
          Timeline
        </Typography>
        <Divider />
        {isLoading && <LinearProgress />}
        {isError && <ErrorMessage />}
        {timelineEntries && <TimelineEntries entries={timelineEntries} />}
      </Paper>
    </Container>
  );
}

function useTimelineEntries() {
  const { data, error } = useSWR<GetTimelineEntriesResponse>(
    '/api/timeline-entries',
    async (url: string) => {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
      throw new Error();
    },
  );

  if (data) {
    const { hasMore, nextCursor, results } = data;

    return {
      hasMore,
      nextCursor,
      data: results,
      isError: false,
      isLoading: false,
    };
  }

  return {
    isLoading: !error && !data,
    isError: error,
  };
}
