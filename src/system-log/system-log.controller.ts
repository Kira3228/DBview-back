import { Controller, Get, ParseArrayPipe, Query, Res } from '@nestjs/common';
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

    if (!data || !data.length) {
      return res.status(204).send();
    }

    const csv = `${headers}\n${rows}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="logs.csv"');
    res.send(csv);
  }
  @Get(`exportSelectedCsv`)
  async exportSelectedCVS(
    @Res() res: Response,
    @Query(`ids`, new ParseArrayPipe({ items: Number, optional: true }))
    ids?: number[],
  ) {
    console.log(ids);
    const { data, headers, rows } =
      await this.systemLogService.getSelectedLogs(ids);

    if (!data || !data.length) {
      return res.status(204).send();
    }

    const csv = `${headers}\n${rows}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="logs.csv"');
    res.send(csv);
  }
}
