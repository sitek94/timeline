import type { NextApiRequest, NextApiResponse } from 'next';
import { getTimelineEntries } from 'src/get-timeline-entries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const cursor = req.query.cursor as string;
    const response = await getTimelineEntries(cursor);

    res.status(200).json(response);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
