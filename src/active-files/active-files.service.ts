import { ActiveFilesFiltersDto } from './dto/ActiveFilesFilters.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { Like, Repository } from 'typeorm';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { log } from 'console';

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
    if (filters.filePath) where.filePath = Like(`%${filters.filePath}%`);
    if (filters.inode) where.inode = Like(`%${filters.inode}%`);
    console.log(where);
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

  async getArchive(
    filters: ActiveFilesFiltersDto,
    page: number = 1,
    limit: number = 30,
  ) {
    // Создаем базовые условия WHERE
    const baseConditions = [];

    // Добавляем условия для каждого статуса
    const statusConditions = ['archived', 'deleted'].map((status) => ({
      ...this.buildWhereConditions(filters),
      status,
    }));

    // Объединяем условия
    const where = [...statusConditions];

    // Выполняем запрос
    const [files, totalCount] = await this.monitoredFilesRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit, // Добавляем take для ограничения количества результатов
    });

    return {
      files,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit), // Более правильное название "totalPages"
      limit,
    };
  }
  private buildWhereConditions(filters: ActiveFilesFiltersDto) {
    const where: any = {};

    if (filters.filePath) {
      where.filePath = Like(`%${filters.filePath}%`);
    }

    if (filters.inode) {
      where.inode = Like(`%${filters.inode}%`);
    }

    return where;
  }

  async updateStatus(dto: UpdateStatusDto, id: number) {
    const { status } = dto;
    const file = await this.monitoredFilesRepo.update({ id }, { status });

    if (file.affected === 0) {
      throw new Error(`Файл с ID ${id} не найден`);
    }
    return this.monitoredFilesRepo.findOneBy({ id });
  }
}
