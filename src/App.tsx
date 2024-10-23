import React, { useState } from 'react';
import { ServerIcon, Download } from 'lucide-react';
import RackLayout from './components/RackLayout';
import DeviceList from './components/DeviceList';
import ServerModal from './components/modals/ServerModal';
import FirewallModal from './components/modals/FirewallModal';
import SwitchModal from './components/modals/SwitchModal';
import { Device, RackUnit, DeviceType } from './types';
import { generateBoM } from './utils/bomGenerator';
import { isPlacementValid, updateRackWithDevice, removeDeviceFromRack } from './utils/rackUtils';

function App() {
  const [racks, setRacks] = useState<RackUnit[][]>([Array(42).fill({ isEmpty: true })]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeModal, setActiveModal] = useState<DeviceType | null>(null);

  const handleAddRack = () => {
    setRacks([...racks, Array(42).fill({ isEmpty: true })]);
  };

  const handleRemoveRack = (rackIndex: number) => {
    const newRacks = racks.filter((_, index) => index !== rackIndex);
    setRacks(newRacks);
  };

  const handleDeviceDrop = (device: Device, rackIndex: number, unitIndex: number) => {
    if (!isPlacementValid(racks, rackIndex, unitIndex, device.units)) {
      alert('Invalid placement: Not enough space or position occupied');
      return;
    }

    const newDevice = {
      ...device,
      id: `${device.type}-${Date.now()}`,
      rackIndex,
      unitIndex
    };

    setSelectedDevice(newDevice);
    setActiveModal(device.type);
  };

  const handleSpecificationsSave = (specifications: Device['specifications']) => {
    if (!selectedDevice) return;

    const newDevice = { ...selectedDevice, specifications };
    setDevices([...devices, newDevice]);
    setRacks(updateRackWithDevice(racks, newDevice, newDevice.rackIndex, newDevice.unitIndex));
    setSelectedDevice(null);
    setActiveModal(null);
  };

  const handleEditDevice = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      setSelectedDevice(device);
      setActiveModal(device.type);
    }
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    setRacks(removeDeviceFromRack(racks, deviceId));
  };

  const handleGenerateBoM = () => {
    generateBoM(devices);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ServerIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Rack Builder</h1>
            </div>
            <button
              onClick={handleGenerateBoM}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Generate BoM
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-6">
          <div className="w-64 flex-shrink-0">
            <DeviceList onDeviceDrop={handleDeviceDrop} />
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Rack Layout</h2>
                  <button
                    onClick={handleAddRack}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Rack
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex space-x-6 overflow-x-auto">
                  {racks.map((rack, index) => (
                    <RackLayout
                      key={index}
                      rack={rack}
                      rackIndex={index}
                      devices={devices}
                      onDeviceDrop={handleDeviceDrop}
                      onRemoveRack={() => handleRemoveRack(index)}
                      onEditDevice={handleEditDevice}
                      onRemoveDevice={handleRemoveDevice}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ServerModal
        isOpen={activeModal === 'server'}
        onClose={() => {
          setActiveModal(null);
          setSelectedDevice(null);
        }}
        onSave={handleSpecificationsSave}
        initialValues={selectedDevice?.specifications}
      />
      <FirewallModal
        isOpen={activeModal === 'firewall'}
        onClose={() => {
          setActiveModal(null);
          setSelectedDevice(null);
        }}
        onSave={handleSpecificationsSave}
        initialValues={selectedDevice?.specifications}
      />
      <SwitchModal
        isOpen={activeModal === 'switch'}
        onClose={() => {
          setActiveModal(null);
          setSelectedDevice(null);
        }}
        onSave={handleSpecificationsSave}
        initialValues={selectedDevice?.specifications}
      />
    </div>
  );
}

export default App;