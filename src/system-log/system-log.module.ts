import { Module } from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { SystemLogController } from './system-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemEvent } from 'src/entities/system_events.entity';
import { MonitoredFile } from 'src/entities/monitored_file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemEvent, MonitoredFile])],
  providers: [SystemLogService],
  controllers: [SystemLogController],
})
export class SystemLogModule {}
