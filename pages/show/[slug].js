import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { Portrait } from '@c/Portrait'
import { Markdown } from '@c/Markdown'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'
import Link from 'next/link'

const ArtistName = styled.h2`
  text-align: center;
`

export default function Shows({ show }) {
  return (
    <Layout title={`${show.title} / next-graphcms-shows`}>
      <Title>{show.title}</Title>
      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>
      <Markdown source={show.description} />

      {show.artists.map((artist) => (
        <div key={artist.id}>
          <Link href={`/artists/${artist.slug}`}>
            <a>
              <ArtistName>{artist.fullName}</ArtistName>
              <Portrait images={artist.images} />
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const show = await getShowBySlug(slug)

  if (!show) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  return {
    props: { show }
  }
}
