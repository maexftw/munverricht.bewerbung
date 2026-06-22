import React from 'react';
import ProjectCaseExplorer from './ProjectCaseExplorer';

type Language = 'de' | 'en';

type ProjectsProps = {
  language: Language;
};

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  return <ProjectCaseExplorer language={language} />;
};

export default Projects;
