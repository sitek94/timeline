import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import useSWRInfinite from 'swr/infinite';
import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { TimelineEntries, TimelineEntriesWrapper } from './timeline-entries';
import ErrorMessage from './error-message';
import { LoadMoreButton, NoMoreEntriesMessage } from './lib';

export const PAGE_SIZE = 40;

export default function App() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <GithubCorner
        href="https://github.com/sitek94/timeline"
        bannerColor={theme.palette.primary.contrastText}
        octoColor={theme.palette.background.paper}
        size={80}
        direction="left"
      />
      <Paper sx={{ minHeight: '100vh', pb: 8 }} square>
        <Typography
          variant="h2"
          component="h1"
          textAlign={{ xs: 'left', sm: 'center' }}
          p={4}
        >
          Timeline
        </Typography>
        <Divider />

        <Main />
      </Paper>
    </Container>
  );
}

function Main() {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isReachingEnd = data && data[data.length - 1].hasMore === false;

  if (!data) {
    return <LinearProgress />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <NoMoreEntriesMessage />
      <TimelineEntriesWrapper>
        {data?.map((page, i) => (
          <TimelineEntries key={i} entries={page.results} />
        ))}
      </TimelineEntriesWrapper>
      <Box sx={{ my: 2, textAlign: 'center' }}>
        {isLoadingMore ? (
          <p>Loading...</p>
        ) : isReachingEnd ? (
          <NoMoreEntriesMessage />
        ) : (
          <LoadMoreButton onClick={() => setSize(size + 1)} />
        )}
      </Box>
    </>
  );
}

const getKey = (pageIndex: number, previousPageData: any) => {
  // Reached the end
  if (previousPageData && !previousPageData.results.length) {
    return null;
  }
  // First page, there is no previous page data
  if (pageIndex === 0) {
    return '/api/data';
  }

  // Add the cursor to api endpoint
  return `/api/data?cursor=${previousPageData.nextCursor}`;
};

function fetcher(url: string) {
  return fetch(url).then(r => r.json());
}
