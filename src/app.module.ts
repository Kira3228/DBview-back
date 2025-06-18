import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredFilesModule } from './monitored-files/monitored-files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [],
      synchronize: true,
    }),
    MonitoredFilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
