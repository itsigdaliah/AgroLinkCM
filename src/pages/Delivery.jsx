import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

function Delivery() {
  const [formData, setFormData] = useState({
    carState: '',
    location: '',
  });
  const [nationalId, setNationalId] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  const [rating, setRating] = useState(0);

  const onDropNationalId = (acceptedFiles) => {
    setNationalId(acceptedFiles[0]);
  };

  const onDropDriversLicense = (acceptedFiles) => {
    setDriversLicense(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsNationalId, getInputProps: getInputPropsNationalId } = useDropzone({ onDrop: onDropNationalId });
  const { getRootProps: getRootPropsDriversLicense, getInputProps: getInputPropsDriversLicense } = useDropzone({ onDrop: onDropDriversLicense });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('carState', formData.carState);
    data.append('location', formData.location);
    data.append('nationalId', nationalId);
    data.append('driversLicense', driversLicense);

    try {
      await axios.post('/api/delivery', data);
      toast.success('Delivery information submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit delivery information');
    }
  };

  const handleRating = async (driverId, rating) => {
    try {
      await axios.post(`/api/delivery/rate/${driverId}`, { rating });
      toast.success('Driver rated successfully!');
    } catch (error) {
      toast.error('Failed to rate driver');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Delivery Page</h1>
          <p className="mt-4 text-lg text-gray-600">Submit your delivery information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="carState" className="block text-sm font-medium text-gray-700">
              Car State
            </label>
            <input
              id="carState"
              name="carState"
              type="text"
              required
              value={formData.carState}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
              National ID
            </label>
            <div {...getRootPropsNationalId()} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 cursor-pointer">
              <input {...getInputPropsNationalId()} />
              {nationalId ? nationalId.name : 'Drag & drop a file here, or click to select a file'}
            </div>
          </div>

          <div>
            <label htmlFor="driversLicense" className="block text-sm font-medium text-gray-700">
              Driver's License
            </label>
            <div {...getRootPropsDriversLicense()} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 cursor-pointer">
              <input {...getInputPropsDriversLicense()} />
              {driversLicense ? driversLicense.name : 'Drag & drop a file here, or click to select a file'}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Rate Drivers</h2>
          <div className="flex space-x-2 mt-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <button
            onClick={() => handleRating('driverId', rating)}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
