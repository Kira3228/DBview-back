import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonitoredFile } from './monitored-file.entity';
import { ProcessVersions } from './process_version.entity';
import { join } from 'path';

@Entity('file_access_events')
export class FileAccessEvents {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: `access_type`, type: `text` })
  accessType: string;
  @Column({
    name: `timestamp`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  timestamp: Date;
  @Column({ name: `file_descriptor`, type: `integer`, nullable: true })
  fileDescriptor: number;
  @Column({ name: `bytes_accessed`, type: `integer`, default: () => 0 })
  bytesAcessed: number;
  @Column({ name: `file_offset`, type: `integer`, default: () => 0 })
  fileOffset: number;
  @Column({ name: `access_flags`, type: `integer`, nullable: true })
  accessFlags: number;
  @Column({ name: `denied`, type: `boolean`, default: () => false })
  dinied: boolean;

  @ManyToOne(() => MonitoredFile, (file) => file.access)
  @JoinColumn({ name: `monitored_file_id` })
  file: MonitoredFile;

  @ManyToOne(() => ProcessVersions, (version) => version.access)
  @JoinColumn({ name: `process_version_id` })
  version: ProcessVersions;
}
