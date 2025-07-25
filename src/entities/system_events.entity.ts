import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonitoredFile } from './monitored-file.entity';
import { Process } from './process.entity';

@Entity(`system_events`)
export class SystemEvents {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: `event_type`, type: `text` })
  eventType: string;
  @Column({ name: `event_data`, type: `text`, nullable: true })
  eventData: string;
  @Column({ name: `severity`, type: `text`, default: () => `info` })
  severity: `debug` | `info` | `warning` | `error` | `critical`;
  @Column({ name: `source`, type: `text`, default: () => `fanotify` })
  source: string;
  @Column({
    name: `timestamp`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  timestamp: Date;

  @ManyToOne(() => MonitoredFile, (file) => file.systemEvents)
  @JoinColumn({ name: `related_file_id` })
  relatedFileId: number;

  @ManyToOne(() => Process, (process) => process.systemEvents)
  @JoinColumn({ name: `related_process_id` })
  relatedProcessId: number;
}
