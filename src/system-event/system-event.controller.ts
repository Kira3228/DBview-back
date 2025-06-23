import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SystemEventService } from './system-event.service';
import { SystemEventFiltersDto } from './dto/SystemEvent.dto';

@Controller('system-event')
export class SystemEventController {
  constructor(private readonly eventService: SystemEventService) {}

  @Post()
  create(@Body() dto) {}

  @Get()
  getEvents(@Query() filters: SystemEventFiltersDto) {
    return this.eventService.getPaginated(filters.page, filters.limit, {
      ...filters,
    });
  }
}
