import { Module } from '@nestjs/common';
import { MonitoredFilesService } from './monitored-files.service';
import { MonitoredFilesController } from './monitored-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoredFile])],
  providers: [MonitoredFilesService],
  controllers: [MonitoredFilesController]
})
export class MonitoredFilesModule {}
