export class SystemEventCreateDto {
  eventType: string;
  eventData: string;
  severity: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  source: string;
  timestamp: Date;
}

export class SystemEventRequetDto {
  id: number;
  eventType: string;
  eventData: string;
  severity: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  source: string;
  timestamp: Date;
}
export class SystemEventFiltersDto {
  fileName?: string;
  userName?: string;
  mni?: string;
  eventType?: string;
  page: number = 1;
  limit: number = 30;
  dateFrom?: string;
  dateTo?: string;
}
