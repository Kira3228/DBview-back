import { Module } from '@nestjs/common';
import { SystemEventService } from './system-event.service';
import { SystemEventController } from './system-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemEvent } from 'src/entities/system_events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemEvent])],
  providers: [SystemEventService],
  controllers: [SystemEventController],
})
export class SystemEventModule {}
