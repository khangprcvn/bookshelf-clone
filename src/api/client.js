const localStorageTokenKey = '__bookshelf_clone_token__'
const localStorageUserKey = '__bookshelf_user__'

async function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageTokenKey)

  const headers = {
    'Content-type': 'application/json'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window.fetch(endpoint, config).then(async response => {
    if (response.status === 401) {
      logout()
      // refresh the page for them
      window.location.assign(window.location)
      return
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

function logout() {
  window.localStorage.removeItem(localStorageTokenKey)
  window.localStorage.removeItem(localStorageUserKey)
}

export { client, logout, localStorageTokenKey, localStorageUserKey }
