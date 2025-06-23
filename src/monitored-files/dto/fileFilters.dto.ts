import { IsOptional, IsIn, IsNumber, IsBoolean, IsDateString } from "class-validator";

// fileFilters.dto.ts
export class FileFiltersDto {
  @IsOptional()
  @IsIn(['active', 'archived', 'deleted'])
  status?: string;

  @IsOptional()
  @IsNumber()
  minSize?: number;

  @IsOptional()
  @IsNumber()
  maxSize?: number;

  @IsOptional()
  @IsBoolean()
  isOriginal?: boolean;

  @IsOptional()
  @IsDateString()
  createdAfter?: Date;

  @IsOptional()
  @IsDateString()
  modifiedBefore?: Date;

  @IsOptional()
  @IsIn(['file_name', 'file_size', 'created_at'])
  sortBy?: string = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 20;
}