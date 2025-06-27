import { Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/CreateProcess.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from 'src/entities/process.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly processService: Repository<Process>,
  ) {}

  async create(dto: CreateProcessDto[]) {
    const process = await this.processService.create(dto);
    return this.processService.save(process);
  }
}
