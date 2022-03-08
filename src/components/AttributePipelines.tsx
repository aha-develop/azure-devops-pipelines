import React, { useMemo, useCallback } from 'react';
import { calcTimeElapsed } from '@helpers/calcTimeElapsed';
import IconText from './IconText';
import StatusIcon from './StatusIcon';
import CardLabel from './CardLabel';

export type AttributePipelinesProps = {
  project?: IProject;
  pipelines?: IPipeline[];
};

const AttributePipelines = ({ pipelines = [], project }: AttributePipelinesProps) => {
  const sortedPipelines = useMemo(
    () => pipelines.sort((a, b) => new Date(b.finishTime).getTime() - new Date(a.finishTime).getTime()),
    [pipelines]
  );

  const handleBranchClick = useCallback(
    (pipeline: IPipeline) => {
      window.open(
        `${project.url}?version=GB${pipeline.branch?.replace('refs/heads/', '') ?? 'main'}]`,
        '_blank',
        'noopener,noreferrer'
      );
      return;
    },
    [project]
  );

  return (
    <div
      style={{
        flexGrow: 1,
        padding: '8px 0',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
      {sortedPipelines.map((pipeline, index) => (
        <aha-tooltip type="popover" hover-show hover-hide style={{ width: '100%' }}>
          <div slot="trigger" style={{ width: '100%' }}>
            <aha-flex
              justify-content="space-between"
              align-items="center"
              gap="8px"
              onClick={() => handleBranchClick(pipeline)}
              style={{ padding: '8px 0', borderTop: index === 0 ? '' : '1px solid var(--theme-light-border)' }}>
              <IconText
                icon="fa-regular fa-code-branch"
                text={pipeline.branch.replace('refs/heads/', '')}
                style={{ flexGrow: 1 }}
                iconStyle={{ color: '#1082d5' }}
              />
              <StatusIcon status={pipeline.buildStatus} />
              <IconText
                icon="fa-regular fa-clock type-icon"
                text={calcTimeElapsed(pipeline.finishTime)}
                iconStyle={{ color: '#1082d5' }}
              />
            </aha-flex>
          </div>
          <aha-flex direction="column">
            <CardLabel title="Name" value={pipeline.name} />
            <CardLabel title="Build #" value={pipeline.buildNumber} />
            <CardLabel title="Commit" value={pipeline.commitHash} />
            <CardLabel title="Author" value={pipeline.authorName} />
          </aha-flex>
        </aha-tooltip>
      ))}
    </div>
  );
};

export default AttributePipelines;
