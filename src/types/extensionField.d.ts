declare interface IExtensionFields {
  [index: string]: IExtensionFieldPipeline;
}

declare interface IExtensionFieldPipeline {
  project?: IProject;
  pipelines?: {
    [index: string]: IPipeline;
  };
}

declare interface IProject {
  id: string;
  name?: string;
  url?: string;
}

declare interface IPipeline {
  id: number;
  buildNumber?: string;
  buildStatus?: AzureDevops.PipelineBuildStatus;
  startTime?: string;
  finishTime?: string;
  name?: string;
  commitHash?: string;
  commitMsg?: string;
  branch?: string;
  workflow?: string;
  authorName?: string;
  authorURL?: string;
}
