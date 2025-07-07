import { Controller, Get } from '@nestjs/common';
import { FileDetailsService } from './file-details.service';

@Controller('file-details')
export class FileDetailsController {
  constructor(private readonly detailsService: FileDetailsService) {}

  @Get(`graph`)
  get() {
    return this.detailsService.getById();
  }
}
