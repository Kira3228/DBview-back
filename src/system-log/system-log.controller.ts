import { Controller, Get, Query, Res } from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { FiltersDto } from './dto/filters.dto';
import { log } from 'console';
import { Response } from 'express';

@Controller('system-log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get('/getSystemLog')
  getSystemLog() {
    return this.systemLogService.getSystemLog();
  }
  @Get('/getFilteredSystemLog')
  getFilteredSystemLog(@Query() filters: FiltersDto) {
    return this.systemLogService.getFilteredSystemLog(
      filters,
      filters.page,
      filters.limit,
    );
  }

  @Get(`exportCsv`)
  async exportCVS(@Res() res: Response) {
    const { data, headers, rows } = await this.systemLogService.getAllLogs();
    // массив объектов

    if (!data || !data.length) {
      return res.status(204).send();
    }

    const csv = `${headers}\n${rows}`;

    // Отправляем как файл
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="logs.csv"');
    res.send(csv);
  }
}
