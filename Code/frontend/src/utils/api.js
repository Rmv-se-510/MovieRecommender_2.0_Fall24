export async function register_api_call(payload){
  let resp = await fetch("/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  let data = await resp.json()
  return data
}

export async function login_api_call(payload){
  let resp = await fetch("/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  let data = await resp.json()
  return data
}

export async function getMovieInList(payload){
  const url = `/movie/${payload.user}/${payload.type}`;
  console.log(url)
  let resp = await fetch(url, {
    method: 'GET',
  })

  let data = await resp.json()
  return data
}

export async function addMovieToList(payload){
  const url = `/movie/${payload.user}/${payload.type}/${payload.movieId}`;
  console.log(url)
  let resp = await fetch(url, {
    method: 'POST',
  })

  if(resp.status !== 200){
    return undefined
  }
  let data = await resp.json()
  return data
}

export async function deleteMovieFromList(payload){
  const url = `/movie/${payload.user}/${payload.type}/${payload.movieId}`;
  console.log(url)
  let resp = await fetch(url, {
    method: 'DELETE',
  })

  let data = await resp.json()
  return data
}
