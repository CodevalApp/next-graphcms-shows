async function fetchAPI(query, variables = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

/**
 * Retrieve all shows via GraphQL
 */
export async function getAllShows(orderBy) {
  const data = await fetchAPI(
    `query ($orderBy: ShowOrderByInput = scheduledStartTime_DESC) {
        shows(orderBy: $orderBy) {
                id
                title
                scheduledStartTime,
                slug
                artists {
                  fullName
                  slug
                }
              }
            }
    `,
    { orderBy }
  )
  return data.shows
}

/**
 * Retrieve a specific show via GraphQL query
 */
export async function getShowBySlug(slug) {
  const data = await fetchAPI(
    `query ($slug: String!) {
      show(where: {slug: $slug}) {
        id
        title
        ticketPrice
        artists {
          id
          slug
          bio
          fullName
          images {
            url
          }
        }
        description
        genre
        scheduledStartTime
      }
    }`,
    { slug }
  )
  return data.show
}

/**
 * Retrieve a specific show via GraphQL query
 */
export async function getArtistBySlug(slug) {
  const data = await fetchAPI(
    `query ($slug: String!) {
      artist(where: {slug: $slug}) {
        id
        slug
        bio
        fullName
        facebookUrl
        instagramUrl
        spotifyUrl
        youTubeUrl
        webUrl
        images {
          url
        }
      }
    }`,
    { slug }
  )
  return data.artist
}

/**
 * Retrieve certain schema by GraphQL query
 */
export async function getSchemaByName(name) {
  const data = await fetchAPI(
    `query ($name: String!) {
      __type(name: $name) {
        name
        fields {
          name
          description
          type {
            name
            kind
          }
        }
      }
    }`,
    { name }
  )
  return data['__type']
}
