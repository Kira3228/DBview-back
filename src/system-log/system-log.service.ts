import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { SystemEvent } from 'src/entities/system_events.entity';
import { Repository } from 'typeorm';
import { FiltersDto } from './dto/filters.dto';

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
        },
        relatedProcessId: true,
      },
    });
    return events;
  }

  async getFilteredSystemLog(filters: FiltersDto, page: number = 1, limit: number = 10) {
    const query = this.systemEventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.relatedFileId', 'file');
    
    if (filters.eventType) {
      query.andWhere('event.eventType = :eventType', {
        eventType: filters.eventType,
      });
    }

    if (filters.status) {
      query.andWhere('file.status = :status', { status: filters.status });
    }

    if (filters.filePath) {
      query.andWhere('file.filePath = :filePath', {
        filePath: filters.filePath,
      });
    }

    if (filters.relatedFileId) {
      if (filters.relatedFileId.status) {
        query.andWhere('file.status = :status', {
          status: filters.relatedFileId.status,
        });
      }
      if (filters.relatedFileId.filePath) {
        query.andWhere('file.filePath = :filePath', {
          filePath: filters.relatedFileId.filePath,
        });
      }
    }

    // Добавляем пагинацию
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [events, totalCount] = await query
      .select([
        'event.id',
        'event.timestamp',
        'event.eventType',
        'event.source',
        'file.id',
        'file.filePath',
        'file.fileName',
        'file.status',
      ])
      .getManyAndCount();

    return { 
      events, 
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      limit
    };
  }
}