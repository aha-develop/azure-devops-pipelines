import { IDENTIFIER } from './config';
import { setExtensionFields } from './setExtensionFields';

/**
 * Save Pipeline Data to Record Field
 *
 * @param record
 * @param pipeline
 */
export const savePipelineToRecord = async (
  record: Aha.RecordUnion,
  pipeline: IExtensionFieldPipeline
): Promise<void> => {
  if (!pipeline?.project?.id) {
    throw new Error('Undefined Project Id');
  }
  const oldPipeline: IExtensionFieldPipeline = await record.getExtensionField(IDENTIFIER, pipeline.project.id);
  if (oldPipeline) {
    pipeline = {
      ...oldPipeline,
      pipelines: {
        ...oldPipeline.pipelines,
        ...pipeline.pipelines
      }
    };
  }

  await setExtensionFields(record, {
    [pipeline.project.id]: pipeline
  });
};
