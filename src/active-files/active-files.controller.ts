import { Controller, Get, Query } from '@nestjs/common';
import { ActiveFilesService } from './active-files.service';
import { ActiveFilesFiltersDto } from './dto/ActiveFilesFilters.dto';

@Controller('active-files')
export class ActiveFilesController {
  constructor(private readonly activeFilesService: ActiveFilesService) {}

  @Get()
  get(@Query() filters: ActiveFilesFiltersDto) {
    return this.activeFilesService.getActiveFiles(
      filters,
      filters.page,
      filters.limit,
    );
  }
  @Get(`archive`)
  getArchive(@Query(`page`) page: number, @Query(`limit`) limit: number) {
    return this.activeFilesService.getArchive(page, limit);
  }
}
