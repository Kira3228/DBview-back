import { Type } from 'class-transformer';
import { IsDataURI, IsDate, IsOptional } from 'class-validator';

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
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
