import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class MoniteredFilesDto {
  @IsString()
  @IsNotEmpty()
  fileSystemId: string;

  @IsNumber()
  @IsNotEmpty()
  inode: number;
  
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  fileSize: number;

  createdAt: Date;
  modifiedAt: Date;

  @IsBoolean()
  isOriginalMarked: boolean;

  @IsNumber()
  @IsNotEmpty()
  maxChainDepth: number;

  @IsNumber()
  @IsNotEmpty()
  minChainDepth: number;

  @IsString()
  @IsNotEmpty()
  status: `active` | `archived` | `deleted`;

  @IsString()
  extendedAttributes: string;
}
