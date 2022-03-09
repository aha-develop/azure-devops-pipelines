import { getRecord } from '@helpers/getRecord';
import { savePipelineToRecord } from '@helpers/savePipelineToRecord';

/**
 * Webhook Listener
 *
 */
aha.on('azurePipelinesHook', async ({ headers, payload }) => {
  const event = payload.eventType;

  switch (event) {
    case 'build.complete':
      await handleBuildCompleted(payload);
      break;
    default:
      break;
  }
});

/**
 * Handle Build Complete Event
 *
 * @param payload
 * @returns
 */
const handleBuildCompleted = async (payload: Webhook.Payload) => {
  const recordField = parsePayloadToPipeline(payload);
  if (!recordField) {
    return;
  }

  const pipeline = Object.values(recordField?.pipelines ?? {})?.[0];

  // Make sure the MR is linked to its record.
  let record = await getRecord(pipeline?.branch?.replace('refs/heads/', ''));
  if (!record) {
    record = await getRecord(pipeline?.commitMsg);
  }

  if (!record) {
    return;
  }

  await savePipelineToRecord(record, recordField);
};

/**
 * Parse webhook payload to extension field by Resource Version
 *
 * @param payload
 * @returns
 */
const parsePayloadToPipeline = (payload: Webhook.Payload): IExtensionFieldPipeline => {
  let pipeline: IExtensionFieldPipeline;
  switch (payload.resourceVersion) {
    case '1.0': {
      pipeline = null;
      break;
    }
    case '2.0-preview.2': {
      const { resource } = payload as Webhook.Payload<AzureDevops.PipelineBuildCompletedResourcesV2>;
      pipeline = {
        project: {
          id: resource?.repository?.id,
          name: resource?.repository?.name,
          url: resource?.repository?.url
        },
        pipelines: {
          [`${resource?.definition?.id}`]: {
            id: resource?.definition?.id,
            buildNumber: resource?.buildNumber,
            buildStatus: resource?.result as any,
            startTime: resource?.startTime,
            finishTime: resource?.finishTime,
            name: resource?.definition?.name,
            commitHash: resource?.triggerInfo?.['ci.sourceSha'],
            commitMsg: resource?.triggerInfo?.['ci.message'],
            branch: resource?.triggerInfo?.['ci.sourceBranch'],
            authorName: resource?.requestedFor?.displayName,
            authorURL: resource?.requestedFor?.imageUrl
          }
        }
      };
      break;
    }
    default: {
      pipeline = null;
      break;
    }
  }
  return pipeline;
};
