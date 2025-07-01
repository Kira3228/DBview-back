import { Module } from '@nestjs/common';
import { ActiveFilesService } from './active-files.service';
import { ActiveFilesController } from './active-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoredFile])],
  providers: [ActiveFilesService],
  controllers: [ActiveFilesController],
})
export class ActiveFilesModule {}
