import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly dbTestService: TestService) {}
  @Get('test-connection')
  async testConnection() {
    return this.dbTestService.findAll();
  }
}
