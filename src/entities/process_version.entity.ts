import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Process } from './process.entity';

@Entity('process_versions')
export class ProcessVersions {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Process, (process) => process.versions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: `process_id` })
  process: Process;

  @Column({ name: `version_number`, type: `integer` })
  versionNumber: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'working_directory',
    type: 'text',
    nullable: true,
  })
  workingDirectory: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  environment: string;
  @Column({
    name: 'environment_hash',
    type: 'text',
    nullable: true,
  })
  environmentHash: string;
}
