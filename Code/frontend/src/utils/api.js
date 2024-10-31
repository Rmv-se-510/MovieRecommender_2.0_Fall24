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
  // console.log(payload)
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
