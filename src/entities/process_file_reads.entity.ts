import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProcessVersions } from './process_version.entity';
import { version } from 'os';
import { MonitoredFile } from './monitored-file.entity';

@Entity(`process_file_reads`)
export class processFileReads {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: `first_read_at`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  firstReadAt: Date;
  @Column({
    name: `last_read_at`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  lastReadAt: Date;

  @Column({ name: `read_count`, type: `integer`, default: () => 1 })
  readCount: number;
  @Column({ name: `total_bytes_read`, type: `integer`, default: () => 0 })
  totalBytesRead: number;

  @ManyToOne(() => ProcessVersions, (version) => version.fileRead)
  @JoinColumn({ name: `process_version_id` })
  processVersionId: number;
  @ManyToOne(() => MonitoredFile, (file) => file.fileRead)
  @JoinColumn({ name: `monitored_file_id` })
  monitoredFileId: number;

  @Index(`VERSION_MONITORED_FILE_IDS`, [
    `process_version_id`,
    `monitored_file_id`,
  ])
  versionMonitoredFileIds: number;
}
