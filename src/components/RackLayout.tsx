import React from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { Device, RackUnit } from '../types';

interface RackLayoutProps {
  rack: RackUnit[];
  rackIndex: number;
  onDeviceDrop: (device: Device, rackIndex: number, unitIndex: number) => void;
  onRemoveRack: () => void;
  onEditDevice?: (deviceId: string) => void;
  onRemoveDevice?: (deviceId: string) => void;
  devices: Device[];
}

const RackLayout: React.FC<RackLayoutProps> = ({
  rack,
  rackIndex,
  onDeviceDrop,
  onRemoveRack,
  onEditDevice,
  onRemoveDevice,
  devices,
}) => {
  const handleDrop = (e: React.DragEvent, unitIndex: number) => {
    e.preventDefault();
    try {
      const deviceData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (deviceData) {
        onDeviceDrop(deviceData, rackIndex, unitIndex);
      }
    } catch (error) {
      console.error('Error parsing device data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const getDeviceInfo = (deviceId?: string) => {
    if (!deviceId) return null;
    return devices.find(d => d.id === deviceId);
  };

  const renderDeviceInfo = (unit: RackUnit) => {
    if (unit.isEmpty || !unit.deviceId) return null;
    const device = getDeviceInfo(unit.deviceId);
    if (!device) return null;

    const specs = device.specifications;
    let specText = '';

    switch (device.type) {
      case 'server':
        specText = `${specs?.processor?.split(' ').slice(-1)[0] || ''} | ${specs?.ram || ''} | ${specs?.storage || ''}`;
        break;
      case 'firewall':
        specText = `${specs?.throughput || ''} | ${specs?.ports || ''} ports`;
        break;
      case 'switch':
        specText = `${specs?.ports || ''} ports @ ${specs?.throughput || ''}`;
        break;
    }

    return (
      <div className="absolute inset-0 flex flex-col justify-between p-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-medium truncate">{device.name}</span>
          <div className="flex space-x-1">
            {onEditDevice && (
              <button
                onClick={() => onEditDevice(device.id)}
                className="p-0.5 text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            )}
            {onRemoveDevice && (
              <button
                onClick={() => onRemoveDevice(device.id)}
                className="p-0.5 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
        <span className="text-gray-500 truncate">{specText}</span>
      </div>
    );
  };

  return (
    <div className="relative flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg">
      <button
        onClick={onRemoveRack}
        className="absolute -top-3 -right-3 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Rack {rackIndex + 1}</h3>
        <div className="space-y-1">
          {rack.map((unit, unitIndex) => (
            <div
              key={unitIndex}
              className={`relative h-8 border ${
                unit.isEmpty 
                  ? 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50' 
                  : 'border-indigo-500 bg-indigo-50'
              } rounded transition-colors`}
              onDrop={(e) => handleDrop(e, unitIndex)}
              onDragOver={handleDragOver}
            >
              {renderDeviceInfo(unit)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RackLayout;