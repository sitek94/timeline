import {
  Container,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import * as React from 'react';
import { TimelineEntry } from 'src/types';
import TimelineEntries from 'src/timeline-entries';
import ErrorMessage from './error-message';

export default function App() {
  const { timelineEntries, isError, isLoading } = useTimelineEntries();

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
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
  const { data, error } = useSWR<TimelineEntry[]>(
    '/api/timeline-entries',
    async (url: string) => {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
      throw new Error();
    },
  );

  return {
    timelineEntries: data,
    isLoading: !error && !data,
    isError: error,
  };
}
