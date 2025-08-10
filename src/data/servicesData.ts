import { Code, Palette, TrendingUp, Camera, Pen, Headphones, Calculator, Globe, Brain, Wrench, Stethoscope } from 'lucide-react'

export const categories = [
  {
    id: 'all',
    name: 'All Services',
    icon: Globe,
    count: 36
  },
  {
    id: 'development',
    name: 'Development',
    icon: Code,
    count: 6
  },
  {
    id: 'design',
    name: 'Design',
    icon: Palette,
    count: 6
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: TrendingUp,
    count: 4
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    count: 6
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: Pen,
    count: 3
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: Headphones,
    count: 2
  },
  {
    id: 'psychology',
    name: 'Psychology',
    icon: Brain,
    count: 3
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: Wrench,
    count: 3
  },
  {
    id: 'medicine',
    name: 'Medicine',
    icon: Stethoscope,
    count: 3
  }
]

export const services = [
  {
    id: 1,
    title: 'Modern Web Application Development',
    description: 'I will create a responsive, modern web application using React, TypeScript, and the latest web technologies. Perfect for startups and businesses looking to establish their online presence.',
    category: 'development',
    provider: {
      name: 'Marcus Johnson',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 127,
      location: 'Austin, TX',
      responseTime: '1 hour'
    },
    price: {
      type: 'package' as const,
      amount: '0.9ETH',
      originalAmount: '0.31ETH'
    },
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'MongoDB'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 2,
    title: 'Brand Identity & Logo Design',
    description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines. I help businesses create memorable and impactful visual identities.',
    category: 'design',
    provider: {
      name: 'Sarah Chen',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      reviews: 89,
      location: 'San Francisco, CA',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.41ETH',
    },
    skills: ['Logo Design', 'Brand Identity', 'Figma', 'Illustrator', 'Typography'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 3,
    title: 'SEO & Digital Marketing Strategy',
    description: 'Comprehensive SEO audit and digital marketing strategy to boost your online visibility. Includes keyword research, content strategy, and performance tracking.',
    category: 'marketing',
    provider: {
      name: 'Emily Rodriguez',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 156,
      location: 'New York, NY',
      responseTime: '30 minutes'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.67ETH/month',
    },
    skills: ['SEO', 'Google Analytics', 'Content Marketing', 'PPC', 'Social Media'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 4,
    title: 'Professional Product Photography',
    description: 'High-quality product photography for e-commerce and marketing. Studio setup with professional lighting and post-processing included.',
    category: 'photography',
    provider: {
      name: 'David Kim',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 73,
      location: 'Los Angeles, CA',
      responseTime: '3 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.21ETH',
      originalAmount: '0.45ETH'
    },
    skills: ['Product Photography', 'Lightroom', 'Photoshop', 'Studio Lighting', 'Retouching'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 5,
    title: 'Mobile App UI/UX Design',
    description: 'Complete mobile app design from wireframes to high-fidelity prototypes. Specialized in iOS and Android design guidelines with user-centered approach.',
    category: 'design',
    provider: {
      name: 'Alex Thompson',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 94,
      location: 'Seattle, WA',
      responseTime: '4 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.94ETH',
    },
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Mobile Design'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 6,
    title: 'Content Writing & Copywriting',
    description: 'Engaging content writing for websites, blogs, and marketing materials. SEO-optimized content that converts visitors into customers.',
    category: 'writing',
    provider: {
      name: 'Jessica Miller',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 112,
      location: 'Chicago, IL',
      responseTime: '2 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.89ETH/month',
    },
    skills: ['Content Writing', 'Copywriting', 'SEO Writing', 'Blog Writing', 'Email Marketing'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 7,
    title: 'E-commerce Store Development',
    description: 'Full-featured e-commerce store with payment integration, inventory management, and admin dashboard. Built with modern technologies for optimal performance.',
    category: 'development',
    provider: {
      name: 'Ryan Foster',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 67,
      location: 'Miami, FL',
      responseTime: '1 hour'
    },
    price: {
      type: 'package' as const,
      amount: '0.56ETH',
      originalAmount: '0.18ETH'
    },
    skills: ['E-commerce', 'Shopify', 'React', 'Payment Integration', 'Database Design'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 8,
    title: 'Podcast Production & Editing',
    description: 'Professional podcast production including recording, editing, mixing, and mastering. Complete audio post-production services for content creators.',
    category: 'audio',
    provider: {
      name: 'Michael Brown',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.6,
      reviews: 45,
      location: 'Nashville, TN',
      responseTime: '6 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.78ETH/month',
    },
    skills: ['Audio Editing', 'Podcast Production', 'Pro Tools', 'Sound Design', 'Mixing'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 9,
    title: 'Social Media Management',
    description: 'Complete social media management including content creation, scheduling, community management, and analytics reporting across all major platforms.',
    category: 'marketing',
    provider: {
      name: 'Amanda Davis',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 91,
      location: 'Denver, CO',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.21ETH',
    },
    skills: ['Social Media', 'Content Creation', 'Instagram', 'Facebook Ads', 'Analytics'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 10,
    title: 'Wedding Photography Package',
    description: 'Complete wedding photography coverage including engagement session, ceremony, reception, and edited high-resolution gallery delivery.',
    category: 'photography',
    provider: {
      name: 'Chris Martinez',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 124,
      location: 'San Diego, CA',
      responseTime: '5 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.64ETH',
      originalAmount: '0.22ETH'
    },
    skills: ['Wedding Photography', 'Portrait Photography', 'Lightroom', 'Event Photography', 'Photo Editing'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 11,
    title: 'Technical Writing & Documentation',
    description: 'Professional technical writing services including API documentation, user manuals, and software documentation. Clear, concise, and user-friendly content.',
    category: 'writing',
    provider: {
      name: 'Robert Taylor',
      image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 56,
      location: 'Portland, OR',
      responseTime: '3 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.98ETH/month',
    },
    skills: ['Technical Writing', 'API Documentation', 'User Manuals', 'Software Documentation', 'Markdown'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 12,
    title: 'Video Editing & Motion Graphics',
    description: 'Professional video editing and motion graphics for marketing videos, social media content, and corporate presentations. High-quality output with fast turnaround.',
    category: 'design',
    provider: {
      name: 'Jordan Lee',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 78,
      location: 'Los Angeles, CA',
      responseTime: '2 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.67ETH/month',
    },
    skills: ['Video Editing', 'Motion Graphics', 'After Effects', 'Premiere Pro', 'Color Grading'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 13,
    title: 'Full-Stack Web Development',
    description: 'Complete full-stack web development services using modern frameworks. From database design to frontend implementation, I handle the entire development lifecycle.',
    category: 'development',
    provider: {
      name: 'Taylor Swift',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 143,
      location: 'San Francisco, CA',
      responseTime: '1 hour'
    },
    price: {
      type: 'package' as const,
      amount: '0.56ETH',
      originalAmount: '0.78ETH'
    },
    skills: ['Full-Stack', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 14,
    title: 'Mobile App Development (React Native)',
    description: 'Cross-platform mobile app development using React Native. Build once, deploy to both iOS and Android with native performance and user experience.',
    category: 'development',
    provider: {
      name: 'Kevin Park',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 89,
      location: 'Seattle, WA',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.89ETH',
    },
    skills: ['React Native', 'Mobile Development', 'iOS', 'Android', 'Firebase'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 15,
    title: 'DevOps & Cloud Infrastructure',
    description: 'Complete DevOps solutions including CI/CD pipelines, cloud infrastructure setup, and deployment automation. Expertise in AWS, Docker, and Kubernetes.',
    category: 'development',
    provider: {
      name: 'Maria Garcia',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      reviews: 67,
      location: 'Austin, TX',
      responseTime: '3 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.78ETH/month',
    },
    skills: ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 16,
    title: 'UX Research & User Testing',
    description: 'Comprehensive UX research services including user interviews, usability testing, and data analysis. Help optimize your product based on real user feedback.',
    category: 'design',
    provider: {
      name: 'Lisa Wang',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 92,
      location: 'New York, NY',
      responseTime: '4 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.57ETH',
    },
    skills: ['UX Research', 'User Testing', 'Data Analysis', 'Figma', 'Survey Design'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 17,
    title: 'Illustration & Digital Art',
    description: 'Custom illustrations and digital artwork for books, websites, marketing materials, and personal projects. Unique artistic style with attention to detail.',
    category: 'design',
    provider: {
      name: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 156,
      location: 'Portland, OR',
      responseTime: '6 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.88ETH',
      originalAmount: '0.44ETH'
    },
    skills: ['Illustration', 'Digital Art', 'Procreate', 'Character Design', 'Concept Art'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 18,
    title: 'Print Design & Layout',
    description: 'Professional print design services for brochures, flyers, business cards, and marketing materials. Print-ready files with proper color management.',
    category: 'design',
    provider: {
      name: 'James Wilson',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 84,
      location: 'Chicago, IL',
      responseTime: '5 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.77ETH',
    },
    skills: ['Print Design', 'InDesign', 'Layout Design', 'Typography', 'Color Management'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 19,
    title: 'Email Marketing Campaigns',
    description: 'Strategic email marketing campaigns that convert. From design to automation, I help businesses build effective email marketing systems.',
    category: 'marketing',
    provider: {
      name: 'Rachel Green',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 118,
      location: 'Miami, FL',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '$470',
    },
    skills: ['Email Marketing', 'Mailchimp', 'Campaign Design', 'Automation', 'Analytics'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 20,
    title: 'PPC Advertising Management',
    description: 'Professional Google Ads and Facebook Ads management. Optimize your ad spend with data-driven strategies and continuous performance monitoring.',
    category: 'marketing',
    provider: {
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 134,
      location: 'San Francisco, CA',
      responseTime: '1 hour'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.55ETH/month',
    },
    skills: ['Google Ads', 'Facebook Ads', 'PPC', 'Analytics', 'Conversion Optimization'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 21,
    title: 'Portrait Photography Session',
    description: 'Professional portrait photography for individuals, families, and corporate headshots. Studio or outdoor sessions with professional editing included.',
    category: 'photography',
    provider: {
      name: 'Sophie Martinez',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 167,
      location: 'Los Angeles, CA',
      responseTime: '4 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.99ETH',
      originalAmount: '0.22ETH'
    },
    skills: ['Portrait Photography', 'Studio Lighting', 'Photo Editing', 'Posing Direction', 'Retouching'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 22,
    title: 'Blog Writing & Content Strategy',
    description: 'Strategic blog writing services that drive traffic and engagement. SEO-optimized articles with compelling storytelling and clear calls-to-action.',
    category: 'writing',
    provider: {
      name: 'Daniel Rodriguez',
      image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 203,
      location: 'Austin, TX',
      responseTime: '3 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.79ETH/month',
    },
    skills: ['Blog Writing', 'Content Strategy', 'SEO Writing', 'Research', 'WordPress'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 23,
    title: 'Music Production & Mixing',
    description: 'Professional music production and mixing services for artists and content creators. High-quality audio production with industry-standard equipment.',
    category: 'audio',
    provider: {
      name: 'Alex Johnson',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 89,
      location: 'Nashville, TN',
      responseTime: '8 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.55ETH',
    },
    skills: ['Music Production', 'Audio Mixing', 'Mastering', 'Pro Tools', 'Sound Design'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 24,
    title: 'Voice Over & Narration',
    description: 'Professional voice over services for commercials, audiobooks, e-learning, and corporate videos. Multiple language options and quick turnaround.',
    category: 'audio',
    provider: {
      name: 'Victoria Smith',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 156,
      location: 'New York, NY',
      responseTime: '6 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.66ETH/month',
    },
    skills: ['Voice Over', 'Narration', 'Audio Recording', 'Script Reading', 'Multiple Languages'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  // Psychology Services
  {
    id: 25,
    title: 'Individual Therapy & Counseling',
    description: 'Professional individual therapy sessions for anxiety, depression, trauma, and personal growth. Evidence-based approaches including CBT and mindfulness techniques.',
    category: 'psychology',
    provider: {
      name: 'Dr. Sarah Williams',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 234,
      location: 'Boston, MA',
      responseTime: '4 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.49ETH/month',
    },
    skills: ['CBT', 'Mindfulness', 'Trauma Therapy', 'Anxiety Treatment', 'Depression Counseling'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 26,
    title: 'Couples & Relationship Therapy',
    description: 'Specialized couples therapy to improve communication, resolve conflicts, and strengthen relationships. Using proven therapeutic approaches for lasting change.',
    category: 'psychology',
    provider: {
      name: 'Dr. Michael Thompson',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 187,
      location: 'San Francisco, CA',
      responseTime: '6 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.88ETH',
    },
    skills: ['Couples Therapy', 'Communication Skills', 'Conflict Resolution', 'Relationship Counseling', 'Family Therapy'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 27,
    title: 'Psychological Assessment & Testing',
    description: 'Comprehensive psychological assessments for ADHD, learning disabilities, personality disorders, and cognitive functioning. Detailed reports and recommendations included.',
    category: 'psychology',
    provider: {
      name: 'Dr. Emily Chen',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      reviews: 156,
      location: 'New York, NY',
      responseTime: '24 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.67ETH',
    },
    skills: ['Psychological Testing', 'ADHD Assessment', 'Learning Disabilities', 'Cognitive Assessment', 'Report Writing'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  // Engineering Services
  {
    id: 28,
    title: 'Structural Engineering Design',
    description: 'Professional structural engineering services for residential and commercial projects. Complete structural analysis, design calculations, and construction drawings.',
    category: 'engineering',
    provider: {
      name: 'James Rodriguez, P.E.',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 98,
      location: 'Houston, TX',
      responseTime: '8 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.77ETH',
    },
    skills: ['Structural Analysis', 'AutoCAD', 'Steel Design', 'Concrete Design', 'Building Codes'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 29,
    title: 'Mechanical System Design',
    description: 'Complete mechanical engineering solutions including HVAC design, piping systems, and equipment selection. Energy-efficient designs with cost optimization.',
    category: 'engineering',
    provider: {
      name: 'Lisa Park, P.E.',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 76,
      location: 'Chicago, IL',
      responseTime: '12 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.67ETH/month',
    },
    skills: ['HVAC Design', 'Piping Systems', 'Energy Analysis', 'Equipment Selection', 'CAD Design'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 30,
    title: 'Electrical Engineering Consultation',
    description: 'Professional electrical engineering services including power system design, lighting design, and electrical code compliance. Residential and commercial projects.',
    category: 'engineering',
    provider: {
      name: 'Robert Kim, P.E.',
      image: 'https://images.pexels.com/photos/3862131/pexels-photo-3862131.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      reviews: 112,
      location: 'Seattle, WA',
      responseTime: '6 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.67ETH',
    },
    skills: ['Power Systems', 'Lighting Design', 'Electrical Codes', 'Load Calculations', 'Circuit Design'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/3862131/pexels-photo-3862131.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  // Additional Photography Services
  {
    id: 31,
    title: 'Real Estate Photography',
    description: 'Professional real estate photography to showcase properties at their best. HDR imaging, virtual staging, and drone photography available for premium listings.',
    category: 'photography',
    provider: {
      name: 'Mark Johnson',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 145,
      location: 'Phoenix, AZ',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.55ETH',
    },
    skills: ['Real Estate Photography', 'HDR Imaging', 'Drone Photography', 'Virtual Staging', 'Property Marketing'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 32,
    title: 'Event Photography Coverage',
    description: 'Complete event photography services for corporate events, parties, and special occasions. Candid moments and professional group shots with same-day preview delivery.',
    category: 'photography',
    provider: {
      name: 'Anna Rodriguez',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 203,
      location: 'Miami, FL',
      responseTime: '3 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.19ETH/month',
    },
    skills: ['Event Photography', 'Corporate Events', 'Candid Photography', 'Group Photography', 'Photo Editing'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 33,
    title: 'Fashion & Beauty Photography',
    description: 'High-end fashion and beauty photography for models, brands, and personal portfolios. Studio and location shoots with professional styling coordination.',
    category: 'photography',
    provider: {
      name: 'Isabella Chen',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      reviews: 89,
      location: 'Los Angeles, CA',
      responseTime: '4 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.38ETH',
      originalAmount: '0.79ETH'
    },
    skills: ['Fashion Photography', 'Beauty Photography', 'Studio Lighting', 'Model Direction', 'High-End Retouching'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  // Medicine Services
  {
    id: 34,
    title: 'Telemedicine Consultation',
    description: 'Virtual medical consultations for general health concerns, follow-up appointments, and prescription renewals. Board-certified physicians available 24/7.',
    category: 'medicine',
    provider: {
      name: 'Dr. Jennifer Martinez, MD',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      reviews: 312,
      location: 'Dallas, TX',
      responseTime: '15 minutes'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.49ETH/month',
    },
    skills: ['General Medicine', 'Telemedicine', 'Prescription Management', 'Health Consultation', 'Medical Records'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 35,
    title: 'Nutrition & Wellness Coaching',
    description: 'Personalized nutrition plans and wellness coaching from registered dietitians. Weight management, sports nutrition, and medical nutrition therapy available.',
    category: 'medicine',
    provider: {
      name: 'Dr. Amanda Foster, RD',
      image: 'https://images.pexels.com/photos/5327659/pexels-photo-5327659.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.8,
      reviews: 198,
      location: 'Portland, OR',
      responseTime: '2 hours'
    },
    price: {
      type: 'package' as const,
      amount: '0.56ETH',
    },
    skills: ['Nutrition Planning', 'Weight Management', 'Sports Nutrition', 'Meal Planning', 'Health Coaching'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/5327659/pexels-photo-5327659.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  },
  {
    id: 36,
    title: 'Medical Writing & Research',
    description: 'Professional medical writing services for research papers, clinical documentation, and regulatory submissions. PhD-level medical writers with industry experience.',
    category: 'medicine',
    provider: {
      name: 'Dr. Thomas Lee, PhD',
      image: 'https://images.pexels.com/photos/5327658/pexels-photo-5327658.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      reviews: 87,
      location: 'Boston, MA',
      responseTime: '12 hours'
    },
    price: {
      type: 'hourly' as const,
      amount: '0.86ETH/month',
    },
    skills: ['Medical Writing', 'Research Papers', 'Clinical Documentation', 'Regulatory Writing', 'Literature Review'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/5327658/pexels-photo-5327658.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    ]
  }
]
