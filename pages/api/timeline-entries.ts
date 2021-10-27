import type { NextApiRequest, NextApiResponse } from 'next';
import { getTimelineEntries } from '../../api/get-timeline-entries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const timelineEntries = await getTimelineEntries();

    res.status(200).json(timelineEntries);
  } catch {
    res.status(400).json({ message: 'Ops' });
  }
}
