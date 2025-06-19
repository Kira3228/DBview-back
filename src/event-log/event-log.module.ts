import { Module } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLogController } from './event-log.controller';

@Module({
  providers: [EventLogService],
  controllers: [EventLogController]
})
export class EventLogModule {}
