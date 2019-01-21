import apiUrl from '../apiConfig'

export const whiskeysIndex = (credentials) => {
  return fetch (apiUrl + '/whiskeys', {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}

export const whiskeyShow = (credentials, id) => {
  return fetch (apiUrl + `/whiskeys/${id}`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}
