import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import {api} from './api';
import serialize from 'serialize-javascript';
import {TemplateResolver} from './WebsiteTemplates';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
async function getSite(domain) {
  try {
    const {data} = await api.get(`/accounts/${domain}`);
    return data;
  } catch (e) {
    console.error(`Site not found ${domain}`);
    return;
  }
}
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};
    const domain = req.hostname;
    const site = await getSite(domain);
    if (!site) {
      return res.redirect(process.env.APP_URL || 'https://mikejam.es');
    }
    const sheet = new ServerStyleSheet();
    const theme = site.theme;
    const AppToRender = TemplateResolver.resolve(site.template);
    try {
      const markup = renderToString(sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <AppToRender />
        </StaticRouter>
      ));
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          ${sheet.getStyleTags()}
          <script>
            window.__site = ${serialize(site)};
          </script>
      </head>
      <body>
          <div id="root">${markup}</div>
      </body>
  </html>`
        );
      }
    } catch (e) {
      res.status(200).send(`<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          <script>
            window.__site = ${serialize(site)};
          </script>
      </head>
      <body>
          <div id="root">${markup}</div>
      </body>
  </html>`);
    } finally {
      sheet.seal();
    }
  });

export default server;
