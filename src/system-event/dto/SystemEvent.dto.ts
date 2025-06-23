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
  page: number = 1;
  limit: number = 30;
  severity?: string;
  dateFrom?: string;
  dateTo?: string;
}
