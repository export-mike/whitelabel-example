const templates = {
  DrivingSchool: () => import('./DrivingSchool/App'),
  Physio: () => import('./Physio/App'),
  default: () => import('./DrivingSchool/App')
};

export const ClientTemplateResolver = {
  resolve: (template) => {
    if (process.env.NODE_ENV === 'development') {
      template = template.split(':')[0];
    }
    const resolver = templates[template] || templates.default;
    return resolver().then(App => {
      return App.default;
    }).catch(e => null);
  }
}