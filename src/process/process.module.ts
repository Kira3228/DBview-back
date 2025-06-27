import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from 'src/entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process])],
  providers: [ProcessService],
  controllers: [ProcessController],
})
export class ProcessModule {}
