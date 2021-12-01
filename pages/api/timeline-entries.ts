import type { NextApiRequest, NextApiResponse } from 'next';
import { getTimelineEntries } from '../../src/get-timeline-entries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const timelineEntries = await getTimelineEntries();

    res.status(200).json(timelineEntries);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
