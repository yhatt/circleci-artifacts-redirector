const express = require('express')
const request = require('sync-request')
const urlJoin = require('url-join')

const app = express()
const env = {
  port: process.env.APP_PORT || 8080,
}

app.get('/', (req, res) => {
  const { query } = req

  const params = {
    branch: query.branch || 'master',
    build: query.build || query.build_num || 'latest',
    path: query.path,
    project: query.project,
    token: query.token || query['circle-token'],
    user: query.username || query.user,
    vcs: query['vcs-type'] || query.vcs_type || query.vcs || 'github',
  }

  const paramKeys = Object.keys(params)
  if (paramKeys.filter(k => !!params[k]).length !== paramKeys.length) {
    throw new Error('Missing required params.')
  }

  const qs = { 'circle-token': params.token, branch: params.branch }
  if (query.filter) qs.filter = query.filter

  const url = urlJoin('https://circleci.com/api/v1.1/project/', params.vcs, params.user, params.project, params.build, 'artifacts')

  const apiResponse = request('GET', url, { qs, headers: { Accept: 'application/json' } })
  if (apiResponse.statusCode !== 200) throw new Error(`Failed API request with status code ${apiResponse.statusCode}.`)

  JSON.parse(apiResponse.body.toString()).forEach((artifact) => {
    if (artifact.path === params.path) {
      res.redirect(301, artifact.url)
    }
  })

  res.send('Missing artifact.')
})

app.use((req, res) => {
  res.status(404)
  res.send('404 Not Found')
})

app.use((err, req, res) => {
  res.status(500)
  res.send(`500 Internal Server Error: ${err.message}`)
})

app.listen(env.port)
