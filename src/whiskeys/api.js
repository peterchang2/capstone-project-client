import apiUrl from '../apiConfig'

export const whiskeysIndex = (credentials) => {
  return fetch (apiUrl + '/whiskeys', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}

export const whiskeyShow = (credentials, id) => {
  return fetch (apiUrl + `/whiskeys/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}

export const favoriteShow = (credentials, id) => {
  return fetch (apiUrl + `/favorites/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}

export const favoritesIndex = (credentials) => {
  return fetch (apiUrl + '/favorites', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}

export const wishesIndex = (credentials) => {
  return fetch (apiUrl + '/wishes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}
