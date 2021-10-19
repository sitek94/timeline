import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { Box, Chip, Link, useTheme } from '@mui/material';
import { TimelineEntry } from '../pages/api/timeline-entries';
import getColorGroup from '../styles/get-color-group';
import { PlayArrow, Videocam } from '@mui/icons-material';

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function TimelineEntries({ entries }: TimelineProps) {
  const theme = useTheme();

  return (
    <Timeline position="alternate">
      {entries.map(({ id, title, timestamp, tags, category, url }) => {
        const Icon = categoryIcons[category.name];

        return (
          <TimelineItem key={id}>
            {/* Date */}
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {new Date(timestamp).toDateString()}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Icon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}>
              {/* Title Link */}
              <Typography variant="h6" component="span">
                {url ? (
                  <Link
                    color="inherit"
                    underline="none"
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </Typography>

              {/* Tags */}
              <Box>
                {tags.map(tag => {
                  const colorGroup = getColorGroup(tag.color);
                  const bgcolor = colorGroup[500];
                  const color = theme.palette.getContrastText(bgcolor);
                  return (
                    <Chip
                      key={tag.id}
                      sx={{
                        mx: 0.25,
                        color,
                        bgcolor,
                      }}
                      label={tag.name}
                      size="small"
                    />
                  );
                })}
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

const categoryIcons: Record<string, typeof PlayArrow> = {
  'video-course': PlayArrow,
  'conference-talk': Videocam,
};
