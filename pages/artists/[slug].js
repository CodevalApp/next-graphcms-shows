import Layout from '@c/Layout'
import { getArtistBySlug } from '@l/graphcms'
import { Title } from '@c/Title'
import FlexyRow from '@c/FlexyRow'
import { Markdown } from '@c/Markdown'

export default function Artist({ artist }) {
  const { fullName, webUrl, facebookUrl, instagramUrl, spotifyUrl, youTubeUrl, bio } = artist;
  return (
    <Layout>
      <Title>{fullName}</Title>
      <FlexyRow justify="flex-start">
        {webUrl && <a href={webUrl} target="_blank">Website</a>}
        {facebookUrl && <a href={facebookUrl} target="_blank">Facebook</a>}
        {instagramUrl && <a href={instagramUrl} target="_blank">Instagram</a>}
        {spotifyUrl && <a href={spotifyUrl} target="_blank">Spotify</a>}
        {youTubeUrl && <a href={youTubeUrl} target="_blank">YouTube</a>}
      </FlexyRow>

      <Markdown source={bio} />
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