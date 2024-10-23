import React, { useState } from 'react';
import { Device } from '../../types';
import Modal from './Modal';

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (specifications: Device['specifications']) => void;
  initialValues?: Device['specifications'];
}

const ServerModal: React.FC<ServerModalProps> = ({ isOpen, onClose, onSave, initialValues }) => {
  const [specs, setSpecs] = useState({
    processor: initialValues?.processor || '',
    ram: initialValues?.ram || '',
    storage: initialValues?.storage || '',
    ports: initialValues?.ports || 4
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(specs);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Server Configuration">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Processor</label>
          <select
            value={specs.processor}
            onChange={(e) => setSpecs({ ...specs, processor: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Processor</option>
            <option value="Intel Xeon Gold 6330">Intel Xeon Gold 6330</option>
            <option value="AMD EPYC 7763">AMD EPYC 7763</option>
            <option value="Intel Xeon Platinum 8380">Intel Xeon Platinum 8380</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">RAM</label>
          <select
            value={specs.ram}
            onChange={(e) => setSpecs({ ...specs, ram: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select RAM</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Storage</label>
          <select
            value={specs.storage}
            onChange={(e) => setSpecs({ ...specs, storage: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Storage</option>
            <option value="1TB SSD">1TB SSD</option>
            <option value="2TB SSD">2TB SSD</option>
            <option value="4TB SSD">4TB SSD</option>
            <option value="8TB SSD">8TB SSD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Network Ports</label>
          <input
            type="number"
            min="1"
            max="8"
            value={specs.ports}
            onChange={(e) => setSpecs({ ...specs, ports: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ServerModal;