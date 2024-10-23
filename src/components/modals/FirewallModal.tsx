import React, { useState } from 'react';
import { Device } from '../../types';
import Modal from './Modal';

interface FirewallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (specifications: Device['specifications']) => void;
  initialValues?: Device['specifications'];
}

const FirewallModal: React.FC<FirewallModalProps> = ({ isOpen, onClose, onSave, initialValues }) => {
  const [specs, setSpecs] = useState({
    throughput: initialValues?.throughput || '',
    ports: initialValues?.ports || 4
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(specs);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Firewall Configuration">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Throughput</label>
          <select
            value={specs.throughput}
            onChange={(e) => setSpecs({ ...specs, throughput: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Throughput</option>
            <option value="1 Gbps">1 Gbps</option>
            <option value="10 Gbps">10 Gbps</option>
            <option value="40 Gbps">40 Gbps</option>
            <option value="100 Gbps">100 Gbps</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Network Ports</label>
          <input
            type="number"
            min="2"
            max="48"
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

export default FirewallModal;