import { Controller, Get, Query } from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { FiltersDto } from './dto/filters.dto';
import { log } from 'console';

@Controller('system-log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get('/getSystemLog')
  getSystemLog() {
    return this.systemLogService.getSystemLog();
  }
  @Get('/getFilteredSystemLog')
  getFilteredSystemLog(@Query() filters: FiltersDto) {
    log(typeof filters.startDate);
    return this.systemLogService.getFilteredSystemLog(
      filters,
      filters.page,
      filters.limit,
    );
  }
}
