import Head from 'next/head'
import Link from 'next/link'
import { Container, Main, Footer } from './Layout.css'

export default function Layout({
  title,
  background,
  children,
  color = '#fff',
  maxWidth = '900px',
  padding = '0 2em',
  alignItems = 'center'
}) {
  return (
    <Container
      background={background}
      color={color}
      padding={padding}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main
        maxWidth={maxWidth}
        alignItems={alignItems}>
        {children}
      </Main>

      <Footer>
        <span>
          &copy; 2021 Codeval. Content is available under
          <Link href="/license"><a>this license</a></Link>.
        </span>
      </Footer>
    </Container>
  )
}
