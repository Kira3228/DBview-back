import { Body, Controller, Post } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/CreateProcess.dto';
import { log } from 'console';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}
  @Post()
  create(@Body() dto: CreateProcessDto[]) {
    log(dto);
    const process = this.processService.create(dto);
    return process;
  }
}
