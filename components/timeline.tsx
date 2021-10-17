import * as React from 'react';
import MuiTimeline from '@mui/lab/Timeline';
import MuiTimelineItem from '@mui/lab/TimelineItem';
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator';
import MuiTimelineConnector from '@mui/lab/TimelineConnector';
import MuiTimelineContent from '@mui/lab/TimelineContent';
import MuiTimelineDot from '@mui/lab/TimelineDot';
import MuiTimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { TimelineItem } from '../types/api';

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <MuiTimeline position="alternate">
      {items.map(({ id, title, timestamp }) => (
        <MuiTimelineItem key={id}>
          <MuiTimelineOppositeContent color="text.secondary">
            {new Date(timestamp).toDateString()}
          </MuiTimelineOppositeContent>
          <MuiTimelineSeparator>
            <MuiTimelineDot />
            <MuiTimelineConnector />
          </MuiTimelineSeparator>
          <MuiTimelineContent>{title}</MuiTimelineContent>
        </MuiTimelineItem>
      ))}
    </MuiTimeline>
  );
}
