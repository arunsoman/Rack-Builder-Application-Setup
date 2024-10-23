import React from 'react';
import { ServerIcon, ShieldIcon, NetworkIcon } from 'lucide-react';
import { Device, DeviceType } from '../types';

interface DeviceListProps {
  onDeviceDrop: (device: Device, rackIndex: number, unitIndex: number) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ onDeviceDrop }) => {
  const devices = [
    { type: 'server' as DeviceType, name: 'Server', icon: ServerIcon, units: 2 },
    { type: 'firewall' as DeviceType, name: 'Firewall', icon: ShieldIcon, units: 1 },
    { type: 'switch' as DeviceType, name: 'Switch', icon: NetworkIcon, units: 1 },
  ];

  const handleDragStart = (e: React.DragEvent, device: typeof devices[0]) => {
    e.dataTransfer.setData('application/json', JSON.stringify(device));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Devices</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.type}
              draggable
              onDragStart={(e) => handleDragStart(e, device)}
              className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
            >
              <device.icon className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">{device.name}</span>
              <span className="ml-auto text-xs text-gray-500">{device.units}U</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeviceList;