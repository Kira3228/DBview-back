import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Process } from './process.entity';
import { FileAccessEvents } from './file_access_events.entity';
import { FileRelationships } from './file_relationships.entity';
import { processFileReads } from './process_file_reads.entity';

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
  @Index('PROCESS_ID_VER_NUM', [`process_id`, `version_number`], {
    unique: true,
  })
  processIdVerNum: number;

  @OneToMany(() => FileAccessEvents, (access) => access.version)
  access: FileAccessEvents[];

  @OneToMany(() => FileRelationships, (file) => file.version)
  relationship: FileRelationships[];

  @OneToMany(() => processFileReads, (file) => file.processVersionId)
  fileRead: processFileReads[];
}
