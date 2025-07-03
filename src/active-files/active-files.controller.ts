import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ActiveFilesService } from './active-files.service';
import { ActiveFilesFiltersDto } from './dto/ActiveFilesFilters.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Controller('active-files')
export class ActiveFilesController {
  constructor(private readonly activeFilesService: ActiveFilesService) {}

  @Get(`active`)
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
  @Patch(`active/update/:id`)
  updateStatus(@Body() dto: UpdateStatusDto, @Param(`id`) id: number) {
    return this.activeFilesService.updateStatus(dto, id);
  }
}
