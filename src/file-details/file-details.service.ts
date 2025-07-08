import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constrainedMemory } from 'process';
import { FileRelationship } from 'src/entities/file_relationships.entity';
import { MonitoredFile } from 'src/entities/monitored_file.entity';
import { Repository } from 'typeorm';
import { Edge, Node } from './graph.type';


@Injectable()
export class FileDetailsService {
  constructor(
    @InjectRepository(MonitoredFile)
    private readonly monitoredFileRepo: Repository<MonitoredFile>,
    @InjectRepository(FileRelationship)
    private readonly relationshipRepo: Repository<FileRelationship>,
  ) {}
  async getById() {
    const files = await this.monitoredFileRepo.find();
    const relations = await this.relationshipRepo.find({
      relations: {
        childrenId: true,
        parentId: true,
      },
      select: {
        childrenId: {
          id: true,
          fileName: true,
        },
        parentId: {
          id: true,
          fileName: true,
        },
      },
    });
    const nodes: Node[] = [];
    files.forEach((file) => {
      nodes.push({
        id: file.id,
        label: file.fileName,
        type: `file`,
        group: file.status,
      });
    });

    const edges: Edge[] = [];

    relations.forEach((relation) => {
      edges.push({
        uniqId: `e${relation.parentId.id}-${relation.childrenId.id}`,
        source: relation.parentId.id,
        target: relation.childrenId.id,
        label: relation.relationshipType,
        type: `file-access`,
      });
    });

    return { nodes, edges };
  }
}
