import React, { memo } from 'react';

export type AttributeProjectProps = {
  project: IProject;
};

const AttributeProject = ({ project }: AttributeProjectProps) => {
  if (!project) {
    return null;
  }
  return (
    <aha-flex>
      <a href={project.url} target="_blank">
        <span className="type-icon">
          <aha-icon icon="fa-solid fa-bookmark type-icon" />
          <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{project?.name}</span>
        </span>
      </a>
    </aha-flex>
  );
};

export default memo(AttributeProject);
