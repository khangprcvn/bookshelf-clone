import { client, localStorageTokenKey, localStorageUserKey } from 'api/client'

function handleUserResponse({ token, ...user }) {
  window.localStorage.setItem(localStorageTokenKey, token)
  window.localStorage.setItem(localStorageUserKey, JSON.stringify(user))
  return user
}

function getUser() {
  const token = getToken()
  if (!token) return Promise.resolve(null)

  return client('/api/users/me').then(data => data)
}

function signup({ username, password }) {
  return client('/api/users/signup', {
    body: { username, password }
  }).then(data => handleUserResponse(data))
}

function login({ username, password }) {
  return client('/api/users/login', {
    body: { username, password }
  }).then(data => handleUserResponse(data))
}

function isLoggedIn() {
  return Boolean(getToken())
}

function getToken() {
  return window.localStorage.getItem(localStorageTokenKey)
}

export { signup, login, getToken, getUser, isLoggedIn }
export { logout } from 'api/client'
