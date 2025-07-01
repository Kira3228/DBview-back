import { Type } from 'class-transformer';
import { IsDataURI, IsDate, IsOptional } from 'class-validator';

export class FiltersDto {
  eventType?: string;
  timestamp?: Date;
  status?: string;
  filePath?: string;
  fileSystemId?: string;

  relatedFileId?: {
    filePath?: string;
    status?: string;
    fileSystemId?: string;
  };
  page?: number;
  limit?: number;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: string;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: string;
}
