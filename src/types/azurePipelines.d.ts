declare namespace AzureDevops {
  type PipelineBuildStatus = 'succeeded' | 'partiallySucceeded' | 'failed' | 'stopped';

  interface PipelineBuildCompletedResourcesV1 {
    id: number;
    uri?: string;
    buildNumber?: string;
    url?: string;
    startTime?: string;
    finishTime?: string;
    reason?: string;
    status?: PipelineBuildStatus;
    dropLocation?: string;
    log?: {
      type?: string;
      url?: string;
      downloadUrl?: string;
    };
    sourceGetVersion?: string;
    lastChangedBy?: {
      id?: string;
      displayName?: string;
      uniqueName?: string;
      url?: string;
      imageUrl?: string;
    };
    definition?: {
      id: number;
      batchSize?: number;
      triggerType?: string;
      definitionType?: string;
      name?: string;
      url?: string;
    };
    queue?: {
      queueType?: string;
      id: number;
      name?: string;
      url?: string;
    };
  }

  interface PipelineBuildCompletedResourcesV2 {
    id: number;
    uri?: string;
    buildNumber?: string;
    url?: string;
    startTime?: string;
    finishTime?: string;
    reason?: string;
    status?: PipelineBuildStatus;
    result?: string; // Build Result
    project?: {
      id?: string;
      url?: string;
      name?: string;
      state?: string;
      revision?: number;
      visibility?: string;
      lastUpdateTime?: string;
    };
    repository?: {
      id?: string;
      url?: string;
      name?: string;
      type?: string;
      clean?: string;
      checkoutSubmodules?: string;
    };
    triggerInfo?: {
      'ci.message'?: string;
      'ci.sourceSha'?: string;
      'ci.sourceBranch'?: string;
      'ci.triggerRepository'?: string;
    };
    sourceBranch?: string;
    dropLocation?: string;
    drop?: {
      location?: string;
      type?: string;
      url?: string;
      downloadUrl?: string;
    };
    logs?: {
      type?: string;
      url?: string;
      downloadUrl?: string;
    };
    lastChangedBy?: {
      id?: string;
      displayName?: string;
      uniqueName?: string;
      url?: string;
      imageUrl?: string;
    };
    requestedFor?: {
      id?: string;
      url?: string;
      displayName?: string;
      uniqueName?: string;
      imageUrl?: string;
      describer?: string;
    };
    requestedBy?: {
      id?: string;
      url?: string;
      displayName?: string;
      uniqueName?: string;
      imageUrl?: string;
      describer?: string;
    };
    definition?: {
      id: number;
      batchSize?: number;
      triggerType?: string;
      definitionType?: string;
      name?: string;
      url?: string;
    };
    queue?: {
      queueType?: string;
      id: number;
      name?: string;
      url?: string;
    };
  }
}
