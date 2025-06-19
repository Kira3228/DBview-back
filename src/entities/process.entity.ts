import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProcessVersions } from './process_version.entity';
import { SystemEvents } from './system_events.entity';

@Entity('processes')
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  pid: number;

  @Column({ name: 'executable_path', type: 'text' })
  executablePath: string;

  @Column({ name: 'command_line', type: 'text', nullable: true })
  commandLine: string;

  @Column({ name: 'parent_pid', type: 'integer', nullable: true })
  parentPid: number | null;

  @Column({ name: 'group_id', type: 'integer' })
  groupId: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'process_start_time', type: 'datetime' })
  processStartTime: Date;

  @OneToMany(() => ProcessVersions, (versions) => versions.process)
  versions: ProcessVersions[];
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => SystemEvents, (event) => event.relatedProcessId)
  systemEvents: SystemEvents[];
}
