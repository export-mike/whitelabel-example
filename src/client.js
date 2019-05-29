import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import {ClientTemplateResolver} from './WebsiteTemplates/ClientTemplateResolver';

ClientTemplateResolver.resolve(window.__site.template)
.then(App => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
}).catch(e => {

});

if (module.hot) {
  module.hot.accept();
}
