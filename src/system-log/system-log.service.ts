import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { SystemEvent } from 'src/entities/system_events.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FiltersDto } from './dto/filters.dto';
import { log } from 'console';

@Injectable()
export class SystemLogService {
  constructor(
    @InjectRepository(SystemEvent)
    private readonly systemEventRepo: Repository<SystemEvent>,
    @InjectRepository(MonitoredFile)
    private readonly monitoredFileRepo: Repository<MonitoredFile>,
  ) {}

  async getSystemLog() {
    const events = await this.systemEventRepo.find({
      relations: [`relatedFileId`],
      select: {
        id: true,
        timestamp: true,
        eventType: true,
        source: true,
        relatedFileId: {
          id: true,
          filePath: true,
          fileName: true,
          status: true,
          fileSystemId: true,
        },
        relatedProcessId: {
          id: true,
          pid: true,
          user: {
            id: true,
            userName: true,
          },
        },
      },
    });
    return events;
  }

  async getFilteredSystemLog(filters: FiltersDto, page = 1, limit = 30) {
    const where: any = {};

    // Простые фильтры по event
    if (filters.eventType) {
      where.eventType = filters.eventType;
    }

    // Фильтры по связанному файлу
    const fileWhere: any = {};
    if (filters.status) {
      fileWhere.status = filters.status;
    }
    if (filters.filePath) {
      fileWhere.filePath = filters.filePath;
    }

    // Вложенные фильтры
    if (filters.relatedFileId) {
      if (filters.relatedFileId.status) {
        fileWhere.status = filters.relatedFileId.status;
      }
      if (filters.relatedFileId.filePath) {
        fileWhere.filePath = filters.relatedFileId.filePath;
      }
    }
    if (filters.startDate) {
      const testDate = new Date(filters.startDate);
      where.timestamp = MoreThanOrEqual(new Date(filters.startDate));
      log(where.timestamp);
    }
    if (filters.endDate) {
      where.timestamp = LessThanOrEqual(new Date(filters.endDate));
      log(where.timestamp);
    }
    if (filters.startDate && filters.endDate) {
      where.timestamp = Between(
        new Date(filters.startDate),
        new Date(filters.endDate),
      );
    }
    if (Object.keys(fileWhere).length > 0) {
      where.relatedFileId = fileWhere;
    }

    const [events, totalCount] = await this.systemEventRepo.findAndCount({
      where,
      relations: ['relatedFileId', `relatedProcessId`],
      select: {
        id: true,
        timestamp: true,
        eventType: true,
        source: true,

        relatedFileId: {
          id: true,
          filePath: true,
          fileName: true,
          status: true,
          fileSystemId: true,
        },
        relatedProcessId: {
          id: true,
          pid: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      events,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      limit,
    };
  }
}
