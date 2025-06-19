import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoredFilesService {
  constructor(
    @InjectRepository(MonitoredFile)
    private readonly repo: Repository<MonitoredFile>,
  ) {}
  

  
  async getAll() {
    return this.repo.find({where:{
        systemEvents:{}
    }});
  }
}
