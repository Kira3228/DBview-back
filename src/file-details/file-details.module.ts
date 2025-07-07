import { Module } from '@nestjs/common';
import { FileDetailsService } from './file-details.service';
import { FileDetailsController } from './file-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { FileRelationship } from 'src/entities/file_relationships.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoredFile, FileRelationship])],
  providers: [FileDetailsService],
  controllers: [FileDetailsController]
})
export class FileDetailsModule {}
