import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonitoredFile } from './monitored-file.entity';

@Entity(`file_origins`)
export class FileOrigins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: `origin_chain_length`, type: `integer` })
  originChainLength: number;

  @Column({
    name: `discovered_at`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  discoveredAt: Date;

  @ManyToOne(() => MonitoredFile, (file) => file.origins)
  @JoinColumn({ name: `file_id` })
  file: MonitoredFile;

  @ManyToOne(() => MonitoredFile, (file) => file.descendants)
  @JoinColumn({ name: 'origin_file_id' })
  originFile: MonitoredFile;

  @Index(`FILE_ORIGIN_FILE_IDS`, [`file_id`, `origin_file_id`], {
    unique: true,
  })
  fileOriginFileIds: number;
}
