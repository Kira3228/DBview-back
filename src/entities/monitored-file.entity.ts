import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { FileAccessEvents } from './file_access_events.entity';
import { FileRelationships } from './file_relationships.entity';
import { FileOrigins } from './file-origins.entity';
import { processFileReads } from './process_file_reads.entity';
import { SystemEvents } from './system_events.entity';

@Entity('monitored_files')
export class MonitoredFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'filesystem_id', type: 'text' })
  filesystemId: string;

  @Column({ type: 'integer' })
  inode: number;

  @Column({ name: 'file_path', type: 'text' })
  filePath: string;

  @Column({ name: 'file_name', type: 'text' })
  fileName: string;

  @Column({ name: 'file_size', type: 'integer', default: 0 })
  fileSize: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'modified_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column({
    name: 'is_original_marked',
    type: 'boolean',
    default: false,
  })
  isOriginalMarked: boolean;

  @Column({
    name: 'max_chain_depth',
    type: 'integer',
    default: 0,
  })
  maxChainDepth: number;

  @Column({
    name: 'min_chain_depth',
    type: 'integer',
    default: 0,
  })
  minChainDepth: number;

  @Column({
    type: 'text',
    default: 'active',
  })
  status: 'active' | 'archived' | 'deleted';

  @Column({
    name: 'extended_attributes',
    type: 'text',
    nullable: true,
  })
  extendedAttributes: string;
  @Index('IDX_MONITORED_FILES_INODE_PATH', ['inode', 'filePath'], {
    unique: true,
  })
  uniqueInodePath: number;

  @OneToMany(() => FileAccessEvents, (access) => access.file)
  access: FileAccessEvents[];

  @OneToMany(() => FileRelationships, (file) => file.parentId)
  parentRelation: FileRelationships[];
  @OneToMany(() => FileRelationships, (file) => file.childrenId)
  childRelation: FileRelationships[];

  @OneToMany(() => FileOrigins, (origin) => origin.file)
  origins: FileOrigins[];
  @OneToMany(() => FileOrigins, (origins) => origins.originFile)
  descendants: FileOrigins[];

  @OneToMany(() => processFileReads, (file) => file.monitoredFileId)
  fileRead: processFileReads[];

  @OneToMany(() => SystemEvents, (event) => event.relatedFileId)
  systemEvents: SystemEvents[];
}
