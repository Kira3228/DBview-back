import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredFilesModule } from './monitored-files/monitored-files.module';
import { FileAccessEvent } from './entities/file_access_events.entity';
import { FileOrigin } from './entities/file_origins.entity';
import { FileRelationship } from './entities/file_relationships.entity';
import { MonitoredFile } from './entities/monitored_file.entity';
import { Process } from './entities/process.entity';
import { ProcessFileRead } from './entities/process_file_reads.entity';
import { ProcessVersion } from './entities/process_version.entity';
import { SystemEvent } from './entities/system_events.entity';
import { User } from './entities/user.entity';

import { EventLogModule } from './event-log/event-log.module';
import { SystemEventModule } from './system-event/system-event.module';
import { SystemLogModule } from './system-log/system-log.module';

import { ProcessModule } from './process/process.module';
import { UserModule } from './user/user.module';
import { ActiveFilesModule } from './active-files/active-files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pmovt.db',
      entities: [
        User,
        SystemEvent,
        Process,
        ProcessVersion,
        ProcessFileRead,
        MonitoredFile,
        FileRelationship,
        FileOrigin,
        FileAccessEvent,
      ],
      synchronize: false,
      logging: true,
    }),
    MonitoredFilesModule,
    EventLogModule,
    SystemEventModule,
    SystemLogModule,

    ProcessModule,

    UserModule,

    ActiveFilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
