export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  rackIndex: number;
  unitIndex: number;
  units: number;
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    ports?: number;
    throughput?: string;
  };
}

export type DeviceType = 'server' | 'firewall' | 'switch';

export interface RackUnit {
  isEmpty: boolean;
  deviceId?: string;
  deviceName?: string;
}

export interface DeviceSpecification {
  type: string;
  processor: string;
  ram: string;
  hardDrive: string;
  networkPorts: number;
}