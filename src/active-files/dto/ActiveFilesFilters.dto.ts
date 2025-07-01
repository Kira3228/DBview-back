export class ActiveFilesFiltersDto {
  id: number;
  inode: number;
  fileSize: number;
  filePath: string;
  minChainDepth: number;
  maxChainDepth: number;
  status: string;
  page: number;
  limit: number;
}
