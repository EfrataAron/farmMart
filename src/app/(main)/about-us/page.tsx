'use client'

import Image from "next/image";

const teamMembers = [
  { name: "Sarah Kimani", role: "Chief Executive Officer", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "James Okello", role: "Chief Technology Officer", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Grace Nanyonga", role: "Head of Operations", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Peter Mugisha", role: "Lead Agronomist", image: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Linda Achieng", role: "Marketing Manager", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Samuel Kato", role: "Logistics Coordinator", image: "https://randomuser.me/api/portraits/men/55.jpg" },
  { name: "Beatrice Tumusiime", role: "Customer Relations Lead", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "David Ochieng", role: "Sustainability Officer", image: "https://randomuser.me/api/portraits/men/77.jpg" },
  { name: "Agnes Nabwire", role: "Finance Manager", image: "https://randomuser.me/api/portraits/women/33.jpg" },
];

const testimonials = [
  { name: "Jane D.", image: "https://randomuser.me/api/portraits/women/12.jpg", text: "AgriLink has made it so easy for me to access fresh produce directly from local farmers. The quality and service are outstanding!" },
  { name: "John K.", image: "https://randomuser.me/api/portraits/men/23.jpg", text: "As a farmer, AgriLink has helped me reach new markets and grow my business. Their support and transparency are unmatched." },
  { name: "Mary Atieno", image: "https://randomuser.me/api/portraits/women/34.jpg", text: "I love the convenience and freshness of the products. AgriLink is my go-to for organic food!" },
  { name: "Paul Nsubuga", image: "https://randomuser.me/api/portraits/men/45.jpg", text: "The delivery is always on time and the produce is top quality. Highly recommended!" },
  { name: "Esther Wanjiku", image: "https://randomuser.me/api/portraits/women/56.jpg", text: "AgriLink's customer service is excellent. They really care about their customers and farmers." },
  { name: "Michael Ouma", image: "https://randomuser.me/api/portraits/men/67.jpg", text: "I appreciate AgriLink's commitment to sustainability and supporting local farmers." },
  { name: "Alice Mutesi", image: "https://randomuser.me/api/portraits/women/78.jpg", text: "The variety of products is amazing. I always find what I need for my family." },
  { name: "Samuel Otieno", image: "https://randomuser.me/api/portraits/men/89.jpg", text: "AgriLink has transformed the way I shop for groceries. It's easy, reliable, and affordable." },
];

const sections = [
  { id: "our-story", label: "Our Story", summary: "Learn about our journey, mission, and how AgriLink started.", details: "AgriLink was founded with the mission to connect farmers directly with consumers, ensuring fresh and organic produce for everyone. Our journey began in 2020, inspired by the need for transparency and sustainability in agriculture. Today, we work with hundreds of farmers and serve thousands of happy customers." },
  { id: "our-team", label: "Our Team", summary: "Meet the passionate people behind AgriLink.", details: null },
  { id: "partners", label: "Partners & Affiliates", summary: "Discover our partners and affiliates who help us grow.", details: "We collaborate with agricultural organizations, logistics companies, and local businesses to ensure a seamless farm-to-table experience. Our partners share our values of sustainability and quality." },
  { id: "careers", label: "Careers", summary: "Join our team and help shape the future of agriculture.", details: "We are always looking for talented and passionate individuals to join our team. Explore open positions in technology, logistics, marketing, and more. Help us make a difference in the world of agriculture!" },
  { id: "testimonials", label: "Testimonials", summary: "See what our customers and partners say about us.", details: null },
  { id: "sustainability", label: "Sustainability", summary: "Read about our commitment to sustainable farming and eco-friendly practices.", details: "Sustainability is at the heart of everything we do. We promote eco-friendly farming practices, support organic certification, and minimize our carbon footprint through efficient logistics. Our goal is to create a positive impact on the environment and the communities we serve." },
];

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-10 xl:px-16">
      <h1 className="text-3xl font-bold mb-8 text-green-700">About Us</h1>
      {sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-600">{section.label}</h2>
          <p className="text-gray-700 mb-2">{section.summary}</p>
          <div
            id={`details-${section.id}`}
            className="text-gray-800 bg-green-50 rounded p-4 border border-green-100 animate-fade-in"
          >
            {section.id === "our-team" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex flex-col items-center bg-white rounded shadow p-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-green-200"
                    />
                    <div className="font-semibold text-green-700 text-lg text-center">{member.name}</div>
                    <div className="text-gray-600 text-sm text-center">{member.role}</div>
                  </div>
                ))}
              </div>
            ) : section.id === "testimonials" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <div key={t.name} className="flex flex-col items-center bg-white rounded shadow p-4">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-green-200"
                    />
                    <div className="font-semibold text-green-700 text-base text-center mb-1">{t.name}</div>
                    <div className="text-gray-700 text-sm text-center italic">&quot;{t.text}&quot;</div>
                  </div>
                ))}
              </div>
            ) : (
              section.details &&
                section.details.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 last:mb-0">{line}</p>
                ))
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
