import { Module } from '@nestjs/common';
import { MonitoredFilesService } from './monitored-files.service';
import { MonitoredFilesController } from './monitored-files.controller';

@Module({
  providers: [MonitoredFilesService],
  controllers: [MonitoredFilesController]
})
export class MonitoredFilesModule {}
