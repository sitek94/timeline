import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import { NotionResults } from '../types/api';
import CustomTimeline, { Item } from '../src/components/timeline';

const Home = ({ data }: { data: NotionResults[] }) => {
  const items: Item[] = data.map(page => ({
    date: page.properties.finished_at.date.start,
    title: page.properties.title.title[0].text.content,
  }));
  return (
    <div>
      <Head>
        <title>Timeline</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h1">Timeline</Typography>
        <CustomTimeline items={items} />
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const res = await fetch(`http://localhost:3000/api/hello`);
  const data: NotionResults[] = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Home;
