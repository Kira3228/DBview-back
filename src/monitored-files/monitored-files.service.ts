import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from '../entities/monitored_file.entity';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

import { FileFiltersDto } from './dto/fileFilters.dto';
import { MoniteredFilesDto } from './dto/monitoredFiles.dto';

@Injectable()
export class MonitoredFilesService {
  constructor(
    @InjectRepository(MonitoredFile)
    private readonly repo: Repository<MonitoredFile>,
  ) {}

  async create(dto: MoniteredFilesDto): Promise<MonitoredFile> {
    const file = this.repo.create(dto);
    return this.repo.save(file);
  }

  async createArray(dtos: MoniteredFilesDto[]): Promise<MonitoredFile[]> {
    if (!dtos || dtos.length === 0) {
      throw new Error('Empty input array');
    }
    const entities = this.repo.create(dtos);
    return this.repo.save(entities);
  }

  async getAll(): Promise<MonitoredFile[]> {
    return this.repo.find();
  }

  async findFiltered(filters: FileFiltersDto): Promise<{
    data: MonitoredFile[];
    count: number;
    page: number;
    totalPages: number;
  }> {
    const where: any = {};

    // Фильтрация
    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.minSize !== undefined && filters.maxSize !== undefined) {
      where.fileSize = Between(filters.minSize, filters.maxSize);
    } else if (filters.minSize !== undefined) {
      where.fileSize = MoreThanOrEqual(filters.minSize);
    } else if (filters.maxSize !== undefined) {
      where.fileSize = LessThanOrEqual(filters.maxSize);
    }

    if (filters.isOriginal !== undefined) {
      where.isOriginalMarked = filters.isOriginal;
    }

    if (filters.createdAfter) {
      where.createdAt = MoreThanOrEqual(new Date(filters.createdAfter));
    }

    if (filters.modifiedBefore) {
      where.modifiedAt = LessThanOrEqual(new Date(filters.modifiedBefore));
    }
    const page = filters.page || 1; // по умолчанию первая страница
    const limit = filters.limit || 10; // по умолчанию 10 элементов

    // Пагинация
    const skip = (page - 1) * limit;
    const take = limit;

    // Исправление сортировки
    const order = {};
    if (filters.sortBy) {
      order[filters.sortBy.toString()] = filters.sortOrder || 'DESC';
    } else {
      order['createdAt'] = 'DESC'; // Сортировка по умолчанию
    }

    const [data, count] = await this.repo.findAndCount({
      where,
      select:{
        
      },
      order,
      skip,
      take,
    });

    return {
      data,
      count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }
}
