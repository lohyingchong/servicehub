export interface Provider {
  id: number
  name: string
  title: string
  bio: string
  image: string
  rating: number
  totalReviews: number
  location: string
  responseTime: string
  hourlyRate: string
  yearsExperience: number
  specialties: string[]
  skills: string[]
  languages: string[]
  completedProjects: number
  availability: 'available' | 'busy' | 'unavailable'
  verified: boolean
  featured: boolean
  portfolio: {
    title: string
    image: string
    description: string
  }[]
  testimonials: {
    client: string
    rating: number
    comment: string
    project: string
  }[]
}

export const providers: Provider[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    title: 'Full-Stack Developer & Tech Lead',
    bio: 'Experienced full-stack developer with 8+ years building scalable web applications. Specialized in React, Node.js, and cloud architecture. Led development teams at multiple startups.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.9,
    totalReviews: 127,
    location: 'Austin, TX',
    responseTime: '1 hour',
    hourlyRate: '0.04 ETH/hr',
    yearsExperience: 8,
    specialties: ['Web Development', 'Mobile Apps', 'Cloud Architecture'],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'MongoDB', 'Docker', 'GraphQL'],
    languages: ['English', 'Spanish'],
    completedProjects: 156,
    availability: 'available',
    verified: true,
    featured: true,
    portfolio: [
      {
        title: 'E-commerce Platform',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Built a complete e-commerce solution with React and Node.js'
      },
      {
        title: 'Mobile Banking App',
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Developed secure mobile banking application with React Native'
      }
    ],
    testimonials: [
      {
        client: 'Sarah Chen',
        rating: 5,
        comment: 'Marcus delivered exceptional work on our web platform. His technical expertise and communication skills are outstanding.',
        project: 'E-commerce Platform'
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Brand Designer & Creative Director',
    bio: 'Award-winning brand designer with 6+ years creating memorable visual identities. Worked with Fortune 500 companies and innovative startups to build compelling brand experiences.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 5.0,
    totalReviews: 89,
    location: 'San Francisco, CA',
    responseTime: '2 hours',
    hourlyRate: '0.035 ETH/hr',
    yearsExperience: 6,
    specialties: ['Brand Identity', 'Logo Design', 'UI/UX Design'],
    skills: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'Typography', 'Color Theory'],
    languages: ['English', 'Mandarin'],
    completedProjects: 234,
    availability: 'available',
    verified: true,
    featured: true,
    portfolio: [
      {
        title: 'Tech Startup Branding',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete brand identity for AI startup including logo, guidelines, and website'
      }
    ],
    testimonials: [
      {
        client: 'David Kim',
        rating: 5,
        comment: 'Sarah created an amazing brand identity that perfectly captured our vision. Highly recommended!',
        project: 'Tech Startup Branding'
      }
    ]
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Digital Marketing Strategist',
    bio: 'Results-driven digital marketing expert with 7+ years helping businesses grow online. Specialized in SEO, PPC, and content marketing with proven ROI track record.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.8,
    totalReviews: 156,
    location: 'New York, NY',
    responseTime: '30 minutes',
    hourlyRate: '0.032 ETH/hr',
    yearsExperience: 7,
    specialties: ['SEO', 'PPC Advertising', 'Content Marketing'],
    skills: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEO', 'Content Strategy', 'Email Marketing'],
    languages: ['English', 'Spanish', 'Portuguese'],
    completedProjects: 189,
    availability: 'busy',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'E-commerce SEO Campaign',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Increased organic traffic by 300% for online retailer'
      }
    ],
    testimonials: [
      {
        client: 'Alex Thompson',
        rating: 5,
        comment: 'Emily transformed our online presence. Our traffic and sales have never been better.',
        project: 'E-commerce SEO Campaign'
      }
    ]
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Professional Photographer',
    bio: 'Creative photographer with 10+ years capturing stunning visuals for brands and events. Specialized in product photography, portraits, and commercial work.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.9,
    totalReviews: 73,
    location: 'Los Angeles, CA',
    responseTime: '3 hours',
    hourlyRate: '0.025 ETH/hr',
    yearsExperience: 10,
    specialties: ['Product Photography', 'Portrait Photography', 'Event Photography'],
    skills: ['Lightroom', 'Photoshop', 'Studio Lighting', 'Photo Retouching', 'Color Grading'],
    languages: ['English', 'Korean'],
    completedProjects: 312,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'Fashion Brand Shoot',
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete product photography for fashion e-commerce brand'
      }
    ],
    testimonials: [
      {
        client: 'Jessica Miller',
        rating: 5,
        comment: 'David\'s photography elevated our brand. The quality and creativity exceeded expectations.',
        project: 'Fashion Brand Shoot'
      }
    ]
  },
  {
    id: 5,
    name: 'Alex Thompson',
    title: 'Mobile App Designer',
    bio: 'Passionate mobile app designer with 5+ years creating intuitive user experiences. Specialized in iOS and Android design with focus on user-centered design principles.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.7,
    totalReviews: 94,
    location: 'Seattle, WA',
    responseTime: '4 hours',
    hourlyRate: '0.038 ETH/hr',
    yearsExperience: 5,
    specialties: ['Mobile UI/UX', 'App Design', 'User Research'],
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems'],
    languages: ['English'],
    completedProjects: 87,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'Fitness App Design',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete UI/UX design for fitness tracking mobile app'
      }
    ],
    testimonials: [
      {
        client: 'Ryan Foster',
        rating: 5,
        comment: 'Alex created an amazing app design that our users love. Great attention to detail.',
        project: 'Fitness App Design'
      }
    ]
  },
  {
    id: 6,
    name: 'Jessica Miller',
    title: 'Content Writer & Copywriter',
    bio: 'Versatile content writer with 6+ years creating compelling copy that converts. Specialized in web content, blog writing, and marketing materials for various industries.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.8,
    totalReviews: 112,
    location: 'Chicago, IL',
    responseTime: '2 hours',
    hourlyRate: '0.022 ETH/hr',
    yearsExperience: 6,
    specialties: ['Content Writing', 'Copywriting', 'Blog Writing'],
    skills: ['SEO Writing', 'Content Strategy', 'Email Marketing', 'Social Media Copy', 'Technical Writing'],
    languages: ['English', 'French'],
    completedProjects: 298,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'SaaS Content Strategy',
        image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete content strategy and blog writing for B2B SaaS company'
      }
    ],
    testimonials: [
      {
        client: 'Michael Brown',
        rating: 5,
        comment: 'Jessica\'s writing significantly improved our website conversion rates. Excellent work!',
        project: 'SaaS Content Strategy'
      }
    ]
  },
  {
    id: 7,
    name: 'Ryan Foster',
    title: 'E-commerce Developer',
    bio: 'Specialized e-commerce developer with 7+ years building high-converting online stores. Expert in Shopify, WooCommerce, and custom e-commerce solutions.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.9,
    totalReviews: 67,
    location: 'Miami, FL',
    responseTime: '1 hour',
    hourlyRate: '0.045 ETH/hr',
    yearsExperience: 7,
    specialties: ['E-commerce Development', 'Shopify', 'Payment Integration'],
    skills: ['Shopify', 'WooCommerce', 'React', 'Payment Gateways', 'Database Design', 'API Integration'],
    languages: ['English', 'Spanish'],
    completedProjects: 143,
    availability: 'available',
    verified: true,
    featured: true,
    portfolio: [
      {
        title: 'Fashion E-commerce Store',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Custom Shopify store with advanced features and integrations'
      }
    ],
    testimonials: [
      {
        client: 'Amanda Davis',
        rating: 5,
        comment: 'Ryan built us an amazing e-commerce store that increased our sales by 200%.',
        project: 'Fashion E-commerce Store'
      }
    ]
  },
  {
    id: 8,
    name: 'Michael Brown',
    title: 'Audio Producer & Sound Engineer',
    bio: 'Professional audio producer with 9+ years in music production and podcast editing. Worked with major labels and top podcasters to deliver exceptional audio quality.',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.6,
    totalReviews: 45,
    location: 'Nashville, TN',
    responseTime: '6 hours',
    hourlyRate: '0.028 ETH/hr',
    yearsExperience: 9,
    specialties: ['Music Production', 'Podcast Editing', 'Audio Mixing'],
    skills: ['Pro Tools', 'Logic Pro', 'Audio Editing', 'Mixing', 'Mastering', 'Sound Design'],
    languages: ['English'],
    completedProjects: 167,
    availability: 'busy',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'Podcast Production',
        image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete podcast production for top business podcast'
      }
    ],
    testimonials: [
      {
        client: 'Chris Martinez',
        rating: 5,
        comment: 'Michael\'s audio production quality is outstanding. Our podcast sounds professional.',
        project: 'Podcast Production'
      }
    ]
  },
  {
    id: 9,
    name: 'Amanda Davis',
    title: 'Social Media Manager',
    bio: 'Creative social media strategist with 5+ years growing brands online. Specialized in content creation, community management, and social media advertising.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.7,
    totalReviews: 91,
    location: 'Denver, CO',
    responseTime: '2 hours',
    hourlyRate: '0.024 ETH/hr',
    yearsExperience: 5,
    specialties: ['Social Media Marketing', 'Content Creation', 'Community Management'],
    skills: ['Instagram', 'Facebook', 'TikTok', 'Content Creation', 'Social Media Ads', 'Analytics'],
    languages: ['English', 'Spanish'],
    completedProjects: 156,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'Restaurant Social Media',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Social media strategy that increased restaurant followers by 500%'
      }
    ],
    testimonials: [
      {
        client: 'Robert Taylor',
        rating: 5,
        comment: 'Amanda transformed our social media presence. Engagement and followers grew significantly.',
        project: 'Restaurant Social Media'
      }
    ]
  },
  {
    id: 10,
    name: 'Chris Martinez',
    title: 'Wedding Photographer',
    bio: 'Passionate wedding photographer with 8+ years capturing love stories. Known for candid moments and artistic compositions that couples treasure forever.',
    image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.9,
    totalReviews: 124,
    location: 'San Diego, CA',
    responseTime: '5 hours',
    hourlyRate: '0.035 ETH/hr',
    yearsExperience: 8,
    specialties: ['Wedding Photography', 'Event Photography', 'Portrait Photography'],
    skills: ['Wedding Photography', 'Lightroom', 'Photoshop', 'Event Photography', 'Photo Editing'],
    languages: ['English', 'Spanish'],
    completedProjects: 234,
    availability: 'available',
    verified: true,
    featured: true,
    portfolio: [
      {
        title: 'Luxury Wedding',
        image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete wedding photography for luxury destination wedding'
      }
    ],
    testimonials: [
      {
        client: 'Jordan Lee',
        rating: 5,
        comment: 'Chris captured our wedding perfectly. The photos are absolutely stunning!',
        project: 'Luxury Wedding'
      }
    ]
  },
  {
    id: 11,
    name: 'Robert Taylor',
    title: 'Technical Writer',
    bio: 'Experienced technical writer with 6+ years creating clear documentation for complex software products. Specialized in API docs, user guides, and developer resources.',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.8,
    totalReviews: 56,
    location: 'Portland, OR',
    responseTime: '3 hours',
    hourlyRate: '0.03 ETH/hr',
    yearsExperience: 6,
    specialties: ['Technical Writing', 'API Documentation', 'User Manuals'],
    skills: ['Technical Writing', 'API Documentation', 'Markdown', 'Git', 'Software Documentation'],
    languages: ['English'],
    completedProjects: 89,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'API Documentation',
        image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'Complete API documentation for fintech startup'
      }
    ],
    testimonials: [
      {
        client: 'Lisa Wang',
        rating: 5,
        comment: 'Robert\'s documentation made our API much easier for developers to understand.',
        project: 'API Documentation'
      }
    ]
  },
  {
    id: 12,
    name: 'Jordan Lee',
    title: 'Video Editor & Motion Designer',
    bio: 'Creative video editor with 7+ years producing engaging content for brands and creators. Specialized in motion graphics, color grading, and storytelling.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.8,
    totalReviews: 78,
    location: 'Los Angeles, CA',
    responseTime: '2 hours',
    hourlyRate: '0.033 ETH/hr',
    yearsExperience: 7,
    specialties: ['Video Editing', 'Motion Graphics', 'Color Grading'],
    skills: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Motion Graphics', 'Color Grading'],
    languages: ['English', 'Korean'],
    completedProjects: 145,
    availability: 'available',
    verified: true,
    featured: false,
    portfolio: [
      {
        title: 'Brand Commercial',
        image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        description: 'High-end commercial video with motion graphics for tech brand'
      }
    ],
    testimonials: [
      {
        client: 'Emma Thompson',
        rating: 5,
        comment: 'Jordan created an amazing commercial that perfectly captured our brand vision.',
        project: 'Brand Commercial'
      }
    ]
  }
]
