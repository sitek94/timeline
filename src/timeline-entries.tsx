import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {
  Box,
  Chip,
  Link,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TimelineEntry } from 'src/types';
import { getColorGroup, getIcon } from 'src/config';

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function TimelineEntries({ entries }: TimelineProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ mb: 0, pb: 4 }}>
      {entries.map(
        ({ id, title, description, finished_at, tags, category, url }) => {
          return (
            <TimelineItem
              key={id}
              sx={{
                // Collapse left timeline item, which is going to be empty on mobiles
                '&:before': {
                  flex: { xs: 0, sm: 1 },
                },
              }}
            >
              {/* Category Icon with Tooltip */}
              <TimelineSeparator>
                <TimelineConnector />
                <Tooltip arrow placement="top" title={category.name}>
                  <TimelineDot role="img" variant="outlined">
                    {getIcon(category.name)}
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ py: '12px', px: 2 }}>
                {/* Date */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  {formatTimestamp(finished_at)}
                </Typography>
                {/* Title Link */}
                <Typography variant="h6" component="h2" mb={0.5}>
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
                {description && (
                  <Typography variant="body2" mb={0.5}>
                    {description}
                  </Typography>
                )}

                {/* Tags */}
                <Box>
                  {tags.map(tag => {
                    const colorGroup = getColorGroup(tag.color);
                    const bgcolor = colorGroup[700];
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
        },
      )}
    </Timeline>
  );
}

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat([], {
    dateStyle: 'long',
  });

  return formatter.format(date);
}
