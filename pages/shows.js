import Layout from '@c/Layout'
import { Grid, Card } from '@c/Grid'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsGridFill, BsList } from 'react-icons/bs'
import { DateTime } from 'luxon'

const StyledButton = styled.button`
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  background: ${(p) => (p.active ? 'dodgerblue' : 'white')};
  cursor: pointer;

  .icon-text {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`

export default function Shows({ shows }) {
  const {
    query: { orderBy }
  } = useRouter()

  const [cardView, setCardView] = useState('grid')

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>
      <label>Sort by:</label>
      <div style={{ display: 'flex' }}>
        <Link href={{ query: { orderBy: 'title_ASC' } }}>
          <StyledButton active={orderBy === 'title_ASC'}>
            Title (a-z)
          </StyledButton>
        </Link>
        <Link href={{ query: { orderBy: 'title_DESC' } }}>
          <StyledButton active={orderBy === 'title_DESC'}>
            Title (z-a)
          </StyledButton>
        </Link>
        <Link href={{ query: { orderBy: 'scheduledStartTime_DESC' } }}>
          <StyledButton active={orderBy === 'scheduledStartTime_DESC'}>
            Start Time (earliest)
          </StyledButton>
        </Link>
        <Link href={{ query: { orderBy: 'scheduledStartTime_ASC' } }}>
          <StyledButton active={orderBy === 'scheduledStartTime_ASC'}>
            Start Time (latest)
          </StyledButton>
        </Link>
      </div>
      <hr style={{ width: '100%' }} />
      <div>
        <StyledButton
          active={cardView === 'grid'}
          onClick={() => setCardView('grid')}
        >
          <div className="icon-text">
            <BsGridFill />
            Grid View
          </div>
        </StyledButton>
        <StyledButton
          active={cardView === 'list'}
          onClick={() => setCardView('list')}
        >
          <div className="icon-text">
            <BsList />
            List View
          </div>
        </StyledButton>
      </div>
      {cardView === 'grid' && (
        <Grid>
          {shows.map((show) => (
            <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
            </Card>
          ))}
        </Grid>
      )}
      {cardView === 'list' && (
        <div style={{ display: 'grid' }}>
          {shows.map((show) => (
            <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <h3>{show.artists.map(({ fullName }) => fullName).join(', ')}</h3>
              <h4>
                {DateTime.fromISO(show.scheduledStartTime).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </h4>
              <p>Ticket price: ${show.ticketPrice}</p>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  )
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

  const { orderBy } = query
  const shows = (await getAllShows(orderBy)) || []
  return {
    props: { shows }
  }
}
