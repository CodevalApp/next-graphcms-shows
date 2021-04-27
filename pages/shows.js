import Layout from '@c/Layout';
import { Grid, Card } from '@c/Grid';
import { Title } from '@c/Title';
import { getAllShows } from '@l/graphcms';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SortButton = styled.button`
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  background: ${(p) => (p.active ? 'dodgerblue' : 'white')};
`;

export default function Shows({ shows }) {
  const {
    query: { orderBy }
  } = useRouter();

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>
      <label>Sort by:</label>
      <div style={{ display: 'flex' }}>
        <Link href={{ query: { orderBy: 'title_ASC' } }}>
          <SortButton active={orderBy === 'title_ASC'}>Title (a-z)</SortButton>
        </Link>
        <Link href={{ query: { orderBy: 'title_DESC' } }}>
          <SortButton active={orderBy === 'title_DESC'}>Title (z-a)</SortButton>
        </Link>
        <Link href={{ query: { orderBy: 'scheduledStartTime_DESC' } }}>
          <SortButton active={orderBy === 'scheduledStartTime_DESC'}>
            Start Time (earliest)
          </SortButton>
        </Link>

        <Link href={{ query: { orderBy: 'scheduledStartTime_ASC' } }}>
          <SortButton active={orderBy === 'scheduledStartTime_ASC'}>
            Start Time (latest)
          </SortButton>
        </Link>
      </div>
      <Grid>
        {shows.map((show) => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  // I chose to use GraphQL's built in sorting rather than sort on the client
  // side.  I added an `orderBy` query parameter to the url on sort button
  // click, which is then parsed in this function below and sent out to our
  // GraphCMS query as an argument. Using GraphQL's built in sorting is
  // more performant than sorting on the client, especially for large
  // datasets.  Also, when utilizing a query parameter, a URL can be shared
  // with the desired sorting applied to the data. Plus, we get to make
  // use of Next.js awesome server rendering!

  const { orderBy } = query;
  const shows = (await getAllShows(orderBy)) || [];
  return {
    props: { shows }
  };
}
