import styled from 'styled-components'

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

export const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0]
    return <ArtistPhoto imageUrl={img.url} />
  }
  return null
}
