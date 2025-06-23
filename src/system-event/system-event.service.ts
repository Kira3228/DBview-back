import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemEvent } from 'src/entities/system_events.entity';
import { ManyToMany, Repository } from 'typeorm';
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
      source: dto.source, // Добавлено
    });
    return this.repo.save(event);
  }
  async getPaginated(
    page: number = 1,
    limit: number = 30,
    filters?: { severity?: string; dateFrom?: string; dateTo?: string },
  ) {
    const query = this.repo.createQueryBuilder('event');

    if (filters?.severity) {
      query.andWhere('event.severity = :severity', {
        severity: filters.severity,
      });
    }

    if (filters?.dateFrom && filters?.dateTo) {
      query.andWhere('event.timestamp BETWEEN :dateFrom AND :dateTo', {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      });
    }

    const [results, total] = await query
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('event.timestamp', 'DESC')
      .getManyAndCount();

    return {
      data: results,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
