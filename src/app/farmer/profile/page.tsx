"use client";
import React, { useState } from "react";
import Image from "next/image";
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { useRouter } from 'next/navigation';

export default function FarmerProfilePage() {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const router = useRouter();
  const [profile, setProfile] = useState({
    name: "Farmer John",
    email: "farmer@mgmail.com",
    phone: "+256 123 456 789",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    farmName: "Green Valley Farm",
    location: "Kampala, Uganda",
    farmSize: "50 acres",
    crops: ["Maize", "Beans", "Tomatoes", "Onions"],
    experience: "15 years",
    certification: "Organic Certified",
  });
  const [form, setForm] = useState(profile);
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result as string }));
        setForm((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Farmer Profile</h1>
      
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <Image 
          src={profile.photo} 
          alt="Farmer Profile" 
          width={128} 
          height={128} 
          className="w-32 h-32 rounded-full object-cover border-4 border-orange-200" 
        />
        <div>
          <div className="text-2xl font-bold text-orange-800">{profile.name}</div>
          <div className="text-gray-600">{profile.farmName}</div>
          <div className="text-sm text-gray-500">{profile.location}</div>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Profile Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
            </div>
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phone</label>
              <input 
                type="text" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Farm Name</label>
              <input 
                type="text" 
                name="farmName" 
                value={form.farmName} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Location</label>
              <input 
                type="text" 
                name="location" 
                value={form.location} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Farm Size</label>
              <input 
                type="text" 
                name="farmSize" 
                value={form.farmSize} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Years of Experience</label>
              <input 
                type="text" 
                name="experience" 
                value={form.experience} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Certification</label>
              <input 
                type="text" 
                name="certification" 
                value={form.certification} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <p className="text-gray-700">{profile.name}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <p className="text-gray-700">{profile.email}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Phone</label>
              <p className="text-gray-700">{profile.phone}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Farm Name</label>
              <p className="text-gray-700">{profile.farmName}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Location</label>
              <p className="text-gray-700">{profile.location}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Farm Size</label>
              <p className="text-gray-700">{profile.farmSize}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Years of Experience</label>
              <p className="text-gray-700">{profile.experience}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Certification</label>
              <p className="text-gray-700">{profile.certification}</p>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Crops Grown</label>
            <div className="flex flex-wrap gap-2">
              {profile.crops.map((crop, index) => (
                <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {crop}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setEditing(true)} 
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
} 
