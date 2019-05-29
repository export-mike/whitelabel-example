import DrivingSchool from './DrivingSchool/App';
import Physio from './Physio/App';

const templates = {
  DrivingSchool,
  Physio,
  default: DrivingSchool
};

export const TemplateResolver = {
  resolve: (template) => {
    return templates[template] || templates.default;
  }
}