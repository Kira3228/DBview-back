import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonitoredFile } from './monitored-file.entity';
import { ProcessVersions } from './process_version.entity';

@Entity(`file_relationships`)
export class FileRelationships {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: `relationship_type`, type: `text`, default: () => `derived` })
  relationshipType: `derived` | `copied` | `modified` | `created_from`;

  @Column({
    name: `created_at`,
    type: `datetime`,
    default: () => `CURRENT_TIMESTAMP`,
  })
  createdAt: Date;

  @ManyToOne(() => MonitoredFile, (file) => file.parentRelation)
  @JoinColumn({ name: `parent_file_id` })
  parentId: MonitoredFile;

  @ManyToOne(() => MonitoredFile, (file) => file.childRelation)
  @JoinColumn({ name: `child_file_id` })
  childrenId: MonitoredFile;

  @ManyToOne(() => ProcessVersions, (version) => version.relationship)
  @JoinColumn({ name: `process_version_id` })
  version: ProcessVersions;

  @Index(
    `PARENT_ID_CHILD_FILE_ID_RELATIONSHIP_TYPE`,
    [`parent_file_id`, `child_file_id`, `process_version_id`],
    {
      unique: true,
    },
  )
  ParentChildVerIds: number;
}
