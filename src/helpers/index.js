const crypto = require('crypto')

export function generateGravatarUrl(email, size) {
  email = email.trim().toLowerCase()
  const hash = crypto.createHash('md5').update(email).digest('hex')

  return `https://www.gravatar.com/avatar/${hash}?s=${size}`
}

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en', options)
}
