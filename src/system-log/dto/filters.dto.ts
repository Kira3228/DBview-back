export class FiltersDto {
  eventType?: string;
  timestamp?: Date;
  status?: string;
  filePath?: string;
  relatedFileId?: {
    filePath?: string;
    status?: string;
  };
  page?: number;
  limit?: number;
}
