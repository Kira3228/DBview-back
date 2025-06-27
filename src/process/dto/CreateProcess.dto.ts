export class CreateProcessDto {
  pid: number;
  executablePath: string;
  commandLine: string;
  parentPid: number | null;
  groupId: number;
  processStartTime: Date;
  userId: number;
}
