import Layout from '@c/Layout'
import { getArtistBySlug } from '@l/graphcms'
import { Title } from '@c/Title'
import { Portrait } from '@c/Portrait'
import FlexyRow from '@c/FlexyRow'
import { Markdown } from '@c/Markdown'

export default function Artist({ artist }) {
  const {
    fullName,
    webUrl,
    facebookUrl,
    instagramUrl,
    spotifyUrl,
    youTubeUrl,
    bio
  } = artist

  const withHttp = (url) => (!/^https?:\/\//i.test(url) ? `http://${url}` : url)

  return (
    <Layout>
      <Title>{fullName}</Title>
      <Portrait images={artist.images} style={{ marginBottom: '1.5rem' }} />
      <FlexyRow justify="flex-start">
        {webUrl && (
          <a href={withHttp(webUrl)} target="_blank" rel="noreferrer">
            Website
          </a>
        )}
        {facebookUrl && (
          <a href={facebookUrl} target="_blank" rel="noreferrer">
            Facebook
          </a>
        )}
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        )}
        {spotifyUrl && (
          <a href={spotifyUrl} target="_blank" rel="noreferrer">
            Spotify
          </a>
        )}
        {youTubeUrl && (
          <a href={youTubeUrl} target="_blank" rel="noreferrer">
            YouTube
          </a>
        )}
      </FlexyRow>

      <Markdown source={bio} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const artist = await getArtistBySlug(slug)

  return {
    props: { artist }
  }
}
