import { Device, RackUnit } from '../types';

export const isPlacementValid = (
  racks: RackUnit[][],
  rackIndex: number,
  unitIndex: number,
  deviceUnits: number
): boolean => {
  const rack = racks[rackIndex];
  if (!rack) return false;

  // Check if there's enough space
  if (unitIndex + deviceUnits > rack.length) return false;

  // Check if all required units are empty
  for (let i = unitIndex; i < unitIndex + deviceUnits; i++) {
    if (!rack[i].isEmpty) return false;
  }

  return true;
};

export const updateRackWithDevice = (
  racks: RackUnit[][],
  device: Device,
  rackIndex: number,
  unitIndex: number
): RackUnit[][] => {
  const newRacks = [...racks];
  const rack = [...newRacks[rackIndex]];

  // Update units occupied by the device
  for (let i = unitIndex; i < unitIndex + device.units; i++) {
    rack[i] = {
      isEmpty: false,
      deviceId: device.id,
      deviceName: device.name
    };
  }

  newRacks[rackIndex] = rack;
  return newRacks;
};

export const removeDeviceFromRack = (
  racks: RackUnit[][],
  deviceId: string
): RackUnit[][] => {
  return racks.map(rack =>
    rack.map(unit =>
      unit.deviceId === deviceId
        ? { isEmpty: true }
        : unit
    )
  );
};