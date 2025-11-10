// Projects data for the farmMart platform

export type ProjectStatus = 'planning' | 'ongoing' | 'completed' | 'on-hold';
export type ProjectType = 'sustainable-farming' | 'greenhouse' | 'irrigation-systems' | 'organic-certification' | 'community-gardens';

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  budget: number;
  location: string;
  client: string;
  images: string[];
  features: string[];
  technologies: string[];
  team: string[];
  progress: number; // 0-100
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

// Sustainable Farming Projects
export const sustainableFarmingProjects: Project[] = [
  {
    id: 1,
    title: 'Organic Crop Rotation System',
    description: 'Implementation of sustainable crop rotation to improve soil health and increase yields',
    fullDescription: 'A comprehensive organic farming project that implements advanced crop rotation techniques, composting systems, and natural pest management to create a fully sustainable farming operation. This project serves as a model for other farms looking to transition to organic practices.',
    category: 'Sustainable Farming',
    type: 'sustainable-farming',
    status: 'completed',
    startDate: '2023-03-15',
    endDate: '2024-02-28',
    budget: 85000,
    location: 'Green Valley Farm, Vermont',
    client: 'Green Valley Organics',
    images: [
      '/images/blog/sustainable-farming.jpg',
      '/images/blog/organic-journey.jpg',
      '/images/green.png'
    ],
    features: [
      'Crop rotation planning',
      'Organic soil enhancement',
      'Natural pest control systems',
      'Composting infrastructure',
      'Water conservation methods'
    ],
    technologies: [
      'Precision agriculture tools',
      'Soil monitoring sensors',
      'Organic fertilizers',
      'Beneficial insect habitats'
    ],
    team: ['Dr. Sarah Johnson - Lead Agronomist', 'Mike Chen - Soil Specialist', 'Lisa Rodriguez - Project Manager'],
    progress: 100,
    testimonial: {
      quote: 'This project transformed our farm completely. We\'ve seen a 40% increase in yields while reducing our environmental impact.',
      author: 'John Miller',
      role: 'Farm Owner, Green Valley Organics'
    }
  },
  {
    id: 2,
    title: 'Regenerative Agriculture Initiative',
    description: 'Large-scale implementation of regenerative farming practices across multiple farms',
    fullDescription: 'A groundbreaking initiative to implement regenerative agriculture practices across a network of farms, focusing on carbon sequestration, biodiversity enhancement, and soil restoration.',
    category: 'Sustainable Farming',
    type: 'sustainable-farming',
    status: 'ongoing',
    startDate: '2024-01-10',
    budget: 150000,
    location: 'Multiple locations across Iowa',
    client: 'Midwest Farming Cooperative',
    images: [
      '/images/blog/market-outlook.jpg',
      '/images/fruits.png',
      '/images/blog/sustainable-farming.jpg'
    ],
    features: [
      'Cover crop integration',
      'Rotational grazing systems',
      'Carbon farming techniques',
      'Biodiversity corridors',
      'Soil health monitoring'
    ],
    technologies: [
      'Drone monitoring systems',
      'Soil carbon testing',
      'GPS-guided equipment',
      'Weather monitoring stations'
    ],
    team: ['Dr. Emily Brown - Lead Researcher', 'Carlos Martinez - Field Coordinator', 'Anna Thompson - Data Analyst'],
    progress: 65
  }
];

// Greenhouse Projects
export const greenhouseProjects: Project[] = [
  {
    id: 3,
    title: 'Smart Greenhouse Complex',
    description: 'State-of-the-art automated greenhouse system with climate control and hydroponic growing',
    fullDescription: 'A cutting-edge greenhouse facility featuring automated climate control, hydroponic growing systems, and AI-powered monitoring to maximize crop yields while minimizing resource usage.',
    category: 'Greenhouse Projects',
    type: 'greenhouse',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-11-30',
    budget: 200000,
    location: 'Sunny Acres Farm, California',
    client: 'Sunny Acres Agricultural Corp',
    images: [
      '/images/blog/precision-agriculture.jpg',
      '/images/tomato.png',
      '/images/cabbage.png'
    ],
    features: [
      'Automated climate control',
      'Hydroponic growing systems',
      'LED grow lights',
      'Automated irrigation',
      'Real-time monitoring'
    ],
    technologies: [
      'IoT sensors',
      'Climate control systems',
      'Hydroponic equipment',
      'Automated systems',
      'Mobile monitoring app'
    ],
    team: ['James Wilson - Project Engineer', 'Maria Garcia - Automation Specialist', 'David Park - Installation Manager'],
    progress: 100,
    testimonial: {
      quote: 'The smart greenhouse has increased our productivity by 300% while reducing water usage by 60%.',
      author: 'Robert Chang',
      role: 'Operations Manager, Sunny Acres'
    }
  },
  {
    id: 4,
    title: 'Urban Vertical Farm',
    description: 'Multi-level vertical farming facility for urban food production',
    fullDescription: 'An innovative vertical farming solution designed for urban environments, maximizing growing space while providing fresh produce to local communities.',
    category: 'Greenhouse Projects',
    type: 'greenhouse',
    status: 'planning',
    startDate: '2024-04-01',
    budget: 350000,
    location: 'Downtown Metro Area, New York',
    client: 'Urban Harvest NYC',
    images: [
      '/images/blog/smart-irrigation.jpg',
      '/images/apple.png',
      '/images/orange.png'
    ],
    features: [
      'Multi-level growing systems',
      'LED lighting arrays',
      'Automated harvesting',
      'Nutrient delivery systems',
      'Air filtration systems'
    ],
    technologies: [
      'Vertical growing towers',
      'Robotic systems',
      'Advanced LED technology',
      'Hydroponic systems',
      'Climate control'
    ],
    team: ['Dr. Lisa Zhang - Urban Agriculture Expert', 'Tom Anderson - System Designer', 'Rachel Kim - Project Coordinator'],
    progress: 15
  }
];

// Irrigation Systems Projects
export const irrigationProjects: Project[] = [
  {
    id: 5,
    title: 'Smart Drip Irrigation Network',
    description: 'Large-scale smart irrigation system with moisture sensors and automated controls',
    fullDescription: 'A comprehensive smart irrigation project covering 500 acres with sensor-based monitoring, automated scheduling, and water conservation features.',
    category: 'Irrigation Systems',
    type: 'irrigation-systems',
    status: 'ongoing',
    startDate: '2024-02-15',
    budget: 120000,
    location: 'Desert Springs Ranch, Arizona',
    client: 'Desert Springs Agriculture',
    images: [
      '/images/blog/smart-irrigation.jpg',
      '/images/potato.png',
      '/images/carrot.png'
    ],
    features: [
      'Soil moisture monitoring',
      'Automated scheduling',
      'Water usage tracking',
      'Weather integration',
      'Mobile app control'
    ],
    technologies: [
      'IoT soil sensors',
      'Smart controllers',
      'Weather stations',
      'Mobile application',
      'Cloud monitoring'
    ],
    team: ['Steve Rodriguez - Irrigation Engineer', 'Amy Foster - Systems Analyst', 'Mike Johnson - Field Technician'],
    progress: 75
  }
];

// Organic Certification Projects
export const organicCertificationProjects: Project[] = [
  {
    id: 6,
    title: 'Organic Transition Program',
    description: 'Comprehensive support for farms transitioning to organic certification',
    fullDescription: 'A complete organic transition program providing consultation, documentation, and support throughout the 3-year organic certification process.',
    category: 'Organic Certification',
    type: 'organic-certification',
    status: 'ongoing',
    startDate: '2023-09-01',
    budget: 45000,
    location: 'Heritage Farms, Oregon',
    client: 'Heritage Organic Farms',
    images: [
      '/images/blog/organic-journey.jpg',
      '/images/cauliflower.png',
      '/images/blog/sustainable-farming.jpg'
    ],
    features: [
      'Certification consulting',
      'Documentation support',
      'Organic practice training',
      'Compliance monitoring',
      'Record keeping systems'
    ],
    technologies: [
      'Digital record keeping',
      'Compliance tracking software',
      'Training materials',
      'Monitoring tools'
    ],
    team: ['Dr. Patricia Adams - Organic Specialist', 'Kevin Brown - Compliance Manager', 'Sandra Lee - Documentation Coordinator'],
    progress: 80
  }
];

// Community Gardens Projects
export const communityGardenProjects: Project[] = [
  {
    id: 7,
    title: 'Community Education Garden',
    description: 'Educational community garden with workshops and sustainable growing practices',
    fullDescription: 'A community-focused project creating an educational garden space where local residents can learn sustainable growing practices and contribute to local food security.',
    category: 'Community Gardens',
    type: 'community-gardens',
    status: 'completed',
    startDate: '2023-04-01',
    endDate: '2023-10-31',
    budget: 25000,
    location: 'Riverside Community Center, Colorado',
    client: 'Riverside Community Association',
    images: [
      '/images/blog/winter-crops.jpg',
      '/images/banana.png',
      '/images/drink.png'
    ],
    features: [
      'Educational workshops',
      'Community plot allocation',
      'Tool sharing library',
      'Composting system',
      'Children\'s learning area'
    ],
    technologies: [
      'Basic irrigation systems',
      'Composting bins',
      'Tool storage solutions',
      'Educational signage'
    ],
    team: ['Jennifer Walsh - Community Coordinator', 'Mark Thompson - Garden Designer', 'Lisa Chen - Education Specialist'],
    progress: 100,
    testimonial: {
      quote: 'This garden has brought our community together and taught our children where food comes from.',
      author: 'Maria Gonzalez',
      role: 'Community Member'
    }
  }
];

// Combine all projects
export const allProjectsData: Project[] = [
  ...sustainableFarmingProjects,
  ...greenhouseProjects,
  ...irrigationProjects,
  ...organicCertificationProjects,
  ...communityGardenProjects
];

// Featured projects for homepage
export const featuredProjects = allProjectsData.filter(project => 
  [1, 3, 5, 7].includes(project.id)
);

// Get projects by category
export const getProjectsByCategory = (category: ProjectType): Project[] => {
  return allProjectsData.filter(project => project.type === category);
};

// Get projects by status
export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return allProjectsData.filter(project => project.status === status);
};

export default allProjectsData;

