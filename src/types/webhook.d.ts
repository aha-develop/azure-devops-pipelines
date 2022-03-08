declare namespace Webhook {
  interface Payload<T = any> {
    id: string;
    publisherId?: string;
    eventType?: string;
    message?: PayloadMessage;
    detailedMessage?: PayloadMessage;
    resource?: T;
    createdDate?: string;
    resourceVersion?: string;
  }

  interface PayloadMessage {
    html?: string;
    text?: string;
    markdown?: string;
  }
}
