import React from 'react'
import { Home, Briefcase, Wrench, Palette, Heart, Car, Brain, Camera, Stethoscope } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Home Services',
    icon: Home,
    description: 'Cleaning, repairs, maintenance',
    color: 'from-blue-500 to-cyan-500',
    count: '2,500+ providers'
  },
  {
    id: 2,
    name: 'Business Services',
    icon: Briefcase,
    description: 'Consulting, marketing, legal',
    color: 'from-purple-500 to-pink-500',
    count: '1,800+ providers'
  },
  {
    id: 3,
    name: 'Technical Services',
    icon: Wrench,
    description: 'IT support, development, repair',
    color: 'from-green-500 to-emerald-500',
    count: '3,200+ providers'
  },
  {
    id: 4,
    name: 'Creative Services',
    icon: Palette,
    description: 'Design, photography, writing',
    color: 'from-orange-500 to-red-500',
    count: '1,500+ providers'
  },
  {
    id: 5,
    name: 'Health & Wellness',
    icon: Heart,
    description: 'Fitness, therapy, nutrition',
    color: 'from-pink-500 to-rose-500',
    count: '900+ providers'
  },
  {
    id: 6,
    name: 'Automotive',
    icon: Car,
    description: 'Repair, maintenance, detailing',
    color: 'from-indigo-500 to-blue-500',
    count: '700+ providers'
  },
  {
    id: 7,
    name: 'Psychology',
    icon: Brain,
    description: 'Therapy, counseling, assessment',
    color: 'from-teal-500 to-cyan-500',
    count: '450+ providers'
  },
  {
    id: 8,
    name: 'Photography',
    icon: Camera,
    description: 'Events, portraits, commercial',
    color: 'from-amber-500 to-orange-500',
    count: '800+ providers'
  },
  {
    id: 9,
    name: 'Medicine',
    icon: Stethoscope,
    description: 'Telemedicine, nutrition, research',
    color: 'from-red-500 to-pink-500',
    count: '600+ providers'
  }
]

const ServiceCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the right service provider for your specific needs across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-3">
                  {category.description}
                </p>
                
                <p className="text-sm font-medium text-blue-600">
                  {category.count}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceCategories
