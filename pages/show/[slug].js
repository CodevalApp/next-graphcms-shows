import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { Markdown } from '@c/Markdown'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'
import Link from 'next/link'

const ArtistName = styled.h2`
  text-align: center;
`

const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid currentColor;
  margin: 0 auto;
`

const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0]
    return (
      <ArtistPhoto imageUrl={img.url} />
    )
  }
  return null
}

export default function Shows({ show }) {
  return (
    <Layout title={`${show.title} / next-graphcms-shows`} maxWidth="900px" padding="0 2em">
      <Title>{show.title}</Title>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>

      <Markdown source={show.description} />

      {show.artists.map(artist => (
        <div key={artist.id}>
          {console.log(artist)}
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
  const show = (await getShowBySlug(slug))

  return {
    props: { show },
  }
}
