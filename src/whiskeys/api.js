import apiUrl from '../apiConfig'

export const whiskeysIndex = () => {
  return fetch (apiUrl + '/whiskeys', {
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  })
}
