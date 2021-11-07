const prod = {
  url:
    { baseUrl: 'https://greenscan-api.herokuapp.com' }
}

const dev = {
  url:
    { baseUrl: 'http://localhost:5000' }
}

export const config = process.env.NODE_ENV === 'developement' ? dev : prod
