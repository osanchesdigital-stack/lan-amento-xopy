import React, { useState, useEffect } from 'react';
import { X, UploadCloud } from 'lucide-react';
import type { Boat, Trip } from '../types';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Boat | Trip) => void;
  entityType: 'boat' | 'trip';
  entityData?: Boat | Trip | null;
  boats?: Boat[]; // Only required for trips
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({ isOpen, onClose, onSave, entityType, entityData, boats }) => {
  const isEditing = !!entityData;
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
        setImagePreview(null);
        return;
    }

    if (entityType === 'boat') {
      const boatData = (entityData as Boat) || { name: '', capacity: 0, imageUrl: '', travelTime: '', status: 'Operando' };
      setFormData(boatData);
      if (boatData.imageUrl) {
        setImagePreview(boatData.imageUrl);
      }
    } else if (entityType === 'trip') {
      setFormData(entityData || { origin: '', destination: '', departureTime: '', arrivalTime: '', boatId: '', price: 0, availableSeats: 0, passengers: [] });
    }
  }, [entityData, entityType, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: name === 'capacity' || name === 'price' || name === 'availableSeats' ? Number(value) : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev: any) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: isEditing ? (entityData as any).id : `new-${Date.now()}` });
  };
  
  const title = `${isEditing ? 'Editar' : 'Novo'} ${entityType === 'boat' ? 'Barco' : 'Viagem'}`;

  const renderBoatFields = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imagem do Barco</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Pré-visualização" className="mx-auto h-24 w-auto rounded-md object-cover" />
            ) : (
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-[#00AEEF] hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#00AEEF]">
                <span>Carregar um arquivo</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, GIF
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
        <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacidade</label>
        <input type="number" name="capacity" id="capacity" value={formData.capacity || 0} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label htmlFor="travelTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempo de Viagem</label>
        <input type="text" name="travelTime" id="travelTime" value={formData.travelTime || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <select name="status" id="status" value={formData.status || 'Operando'} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
          <option value="Operando">Operando</option>
          <option value="Manutenção">Manutenção</option>
          <option value="Ancorado">Ancorado</option>
        </select>
      </div>
    </>
  );

  const renderTripFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origem</label>
          <input type="text" name="origin" id="origin" value={formData.origin || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destino</label>
          <input type="text" name="destination" id="destination" value={formData.destination || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Partida</label>
          <input type="time" name="departureTime" id="departureTime" value={formData.departureTime || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chegada</label>
          <input type="time" name="arrivalTime" id="arrivalTime" value={formData.arrivalTime || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="boatId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Barco</label>
        <select name="boatId" id="boatId" value={formData.boatId || ''} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
          <option value="" disabled>Selecione um barco</option>
          {boats?.map(boat => <option key={boat.id} value={boat.id}>{boat.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preço (R$)</label>
            <input type="number" name="price" id="price" value={formData.price || 0} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
        <div>
            <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vagas</label>
            <input type="number" name="availableSeats" id="availableSeats" value={formData.availableSeats || 0} onChange={handleChange} required className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#003366] dark:text-gray-100">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><X size={24} /></button>
        </header>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          {entityType === 'boat' ? renderBoatFields() : renderTripFields()}
          <footer className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-[#00AEEF] text-white rounded-md hover:bg-blue-400">
              Salvar Alterações
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AdminFormModal;