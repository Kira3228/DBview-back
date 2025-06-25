import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemEvent } from 'src/entities/system_events.entity';
import { Between, Repository } from 'typeorm';
import { SystemEventCreateDto } from './dto/SystemEvent.dto';

@Injectable()
export class SystemEventService {
  constructor(
    @InjectRepository(SystemEvent)
    private readonly repo: Repository<SystemEvent>,
  ) {}

  async create(dto: SystemEventCreateDto) {
    const event = this.repo.create({
      timestamp: dto.timestamp,
      eventType: dto.eventType,
      eventData: dto.eventData,
      severity: dto.severity,
      source: dto.source,
    });
    return this.repo.save(event);
  }

  async getPaginated(
    page: number = 1,
    limit: number = 30,
    filters?: {
      fileName?: string;
      userName?: string;
      mni?: string;
      eventType?: string;
      dateFrom?: string;
      dateTo?: string;
    },
  ) {
    const where: any = {};

    if (filters?.dateFrom && filters?.dateTo) {
      where.timestamp = Between(filters.dateFrom, filters.dateTo);
    }
    if (filters?.userName) {
      where.userName = filters.userName;
    }
    if (filters?.fileName) {
      where.fileName = filters.fileName;
    }
    
    if (filters?.eventType) {
      where.eventType = filters.eventType;
    }
    const [results, total] = await this.repo.findAndCount({
      where: {
        
      },
      take: limit,
      skip: (page - 1) * limit,
      order: {
        timestamp: 'DESC',
      },
    });

    return {
      data: results,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
