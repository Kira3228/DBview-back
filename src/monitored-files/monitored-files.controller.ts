import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MonitoredFilesService } from './monitored-files.service';
import { MoniteredFilesDto } from './dto/monitoredFiles.dto';
import { FileFiltersDto } from './dto/fileFilters.dto';

@Controller('monitored-files')
export class MonitoredFilesController {
  constructor(private readonly monitoredFileService: MonitoredFilesService) {}

  @Post('create')
  create(@Body() dto: MoniteredFilesDto) {
    return this.monitoredFileService.create(dto);
  }
  @Post('create-array')
  createArr(@Body() dto: MoniteredFilesDto[]) {
    return this.monitoredFileService.createArray(dto);
  }
  @Get(`get`)
  getAll() {
    return this.monitoredFileService.getAll();
  }
  @Get(`filters`)
  async getFiles(@Query() filters: FileFiltersDto) {
    return this.monitoredFileService.findFiltered(filters);
  }

}
