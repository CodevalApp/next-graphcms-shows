import Layout from '@c/Layout'
import { getArtistBySlug } from '@l/graphcms'
import { Title } from '@c/Title'
import FlexyRow from '@c/FlexyRow'
import { Markdown } from '@c/Markdown'

export default function Artist({ artist }) {
  console.log(artist)
  return (
    <Layout>
      <Title>{artist.fullName}</Title>
      <FlexyRow justify="flex-start">
        <a href={artist.webUrl} target="_blank">Website</a>
        <a href={artist.facebookUrl} target="_blank">Facebook</a>
        <a href={artist.instagramUrl} target="_blank">Instagram</a>
        <a href={artist.spotifyUrl} target="_blank">Spotify</a>
        <a href={artist.youTubeUrl} target="_blank">YouTube</a>
      </FlexyRow>

      <Markdown source={artist.bio} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const artist = (await getArtistBySlug(slug))

  return {
    props: { artist },
  }
}