export interface IEventsService {
  emitJobUpdated(trackingCode: string, jobData: any): void;
}
