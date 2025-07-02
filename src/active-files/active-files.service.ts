import { ActiveFilesFiltersDto } from './dto/ActiveFilesFilters.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { Or, Repository } from 'typeorm';

@Injectable()
export class ActiveFilesService {
  constructor(
    @InjectRepository(MonitoredFile)
    private readonly monitoredFilesRepo: Repository<MonitoredFile>,
  ) {}

  async getActiveFiles(
    filters: ActiveFilesFiltersDto,
    page: number = 1,
    limit: number = 30,
  ) {
    const where: any = {};
    if (filters.filePath) where.filePath = filters.filePath;
    if (filters.inode) where.inode = filters.inode;

    const [files, totalCount] = await this.monitoredFilesRepo.findAndCount({
      where,
      select: {
        id: true,
        inode: true,
        fileSize: true,
        filePath: true,
        minChainDepth: true,
        maxChainDepth: true,
        status: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      files,
      totalCount,
      page,
      totalPage: Math.ceil(totalCount / limit),
      limit,
    };
  }

  async getArchive(page: number = 1, limit: number = 30) {
    const [archivedFiles, totalCount] =
      await this.monitoredFilesRepo.findAndCount({
        where: [
          {
            status: 'archived',
          },
          {
            status: `deleted`,
          },
        ],
        skip: (page - 1) * limit,
      });

    return {
      archivedFiles,
      totalCount,
      page,
      totalPage: Math.ceil(totalCount / limit),
      limit,
    };
  }
  
}
