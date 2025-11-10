import React from 'react';
import Image from 'next/image';

interface Expert {
  name: string;
  specialty: string;
  image: string;
}

interface MeetOurExpertsProps {
  service?: 'consultation' | 'crop-planning' | 'soil-testing' | 'pest-control' | 'irrigation';
}

const expertsByService: Record<string, Expert[]> = {
  consultation: [
    { name: "Dr. Anna Nanyonga", specialty: "Soil & Crop Specialist", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Peter Mugisha", specialty: "Organic Farming Expert", image: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Linda Achieng", specialty: "Farm Business Advisor", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "John Doe", specialty: "AgriTech Consultant", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Grace Kim", specialty: "Sustainability Advisor", image: "https://randomuser.me/api/portraits/women/23.jpg" },
  ],
  'crop-planning': [
    { name: "Samuel Okello", specialty: "Crop Rotation Specialist", image: "https://randomuser.me/api/portraits/men/33.jpg" },
    { name: "Janet Tumusiime", specialty: "Agroecologist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Paul Kato", specialty: "Yield Optimization Expert", image: "https://randomuser.me/api/portraits/men/55.jpg" },
    { name: "Emily Wang", specialty: "Seed Selection Expert", image: "https://randomuser.me/api/portraits/women/56.jpg" },
    { name: "Carlos Mendez", specialty: "Climate Adaptation Specialist", image: "https://randomuser.me/api/portraits/men/57.jpg" },
  ],
  'soil-testing': [
    { name: "Dr. Alice Mirembe", specialty: "Soil Scientist", image: "https://randomuser.me/api/portraits/women/22.jpg" },
    { name: "John Ssenyonga", specialty: "Lab Technician", image: "https://randomuser.me/api/portraits/men/24.jpg" },
    { name: "Sarah Nakitende", specialty: "Nutrient Analyst", image: "https://randomuser.me/api/portraits/women/27.jpg" },
    { name: "David Kimani", specialty: "Field Sampler", image: "https://randomuser.me/api/portraits/men/28.jpg" },
    { name: "Maria Lopez", specialty: "Soil Microbiologist", image: "https://randomuser.me/api/portraits/women/29.jpg" },
  ],
  'pest-control': [
    { name: "Dr. Moses Lwanga", specialty: "Entomologist", image: "https://randomuser.me/api/portraits/men/66.jpg" },
    { name: "Grace Nabirye", specialty: "Integrated Pest Manager", image: "https://randomuser.me/api/portraits/women/77.jpg" },
    { name: "James Ouma", specialty: "Field Pest Control Expert", image: "https://randomuser.me/api/portraits/men/88.jpg" },
    { name: "Linda Smith", specialty: "Biological Control Specialist", image: "https://randomuser.me/api/portraits/women/89.jpg" },
    { name: "Victor Otieno", specialty: "Pesticide Safety Advisor", image: "https://randomuser.me/api/portraits/men/90.jpg" },
  ],
  irrigation: [
    { name: "Eng. Robert Musoke", specialty: "Irrigation Systems Engineer", image: "https://randomuser.me/api/portraits/men/99.jpg" },
    { name: "Diana Kaggwa", specialty: "Water Management Specialist", image: "https://randomuser.me/api/portraits/women/11.jpg" },
    { name: "Fredrick Ssemanda", specialty: "Installation Technician", image: "https://randomuser.me/api/portraits/men/12.jpg" },
    { name: "Sofia Petrova", specialty: "Drip Irrigation Expert", image: "https://randomuser.me/api/portraits/women/13.jpg" },
    { name: "Raj Patel", specialty: "Pump Specialist", image: "https://randomuser.me/api/portraits/men/14.jpg" },
  ],
};

export default function MeetOurExperts({ service = 'consultation' }: MeetOurExpertsProps) {
  const experts = expertsByService[service] || expertsByService['consultation'];
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-orange-600 mb-2">Meet Our Experts</h2>
      <div className="flex flex-wrap gap-6">
        {experts.map((exp) => (
          <div key={exp.name} className="flex flex-col items-center bg-white rounded shadow p-4 w-48">
            <Image src={exp.image} alt={exp.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-orange-200" />
            <div className="font-semibold text-orange-700 text-base text-center">{exp.name}</div>
            <div className="text-gray-600 text-sm text-center">{exp.specialty}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 
