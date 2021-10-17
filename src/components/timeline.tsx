import * as React from 'react';
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export interface Item {
  date: Date;
  title: string;
}

export default function CustomTimeline({ items }: { items: Item[] }) {
  return (
    <MuiTimeline position="alternate">
      {items.map(({ title, date }) => (
        <TimelineItem key={title}>
          <TimelineOppositeContent color="text.secondary">
            {date.toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{title}</TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
