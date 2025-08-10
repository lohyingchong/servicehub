import React from 'react'
import { Search, UserCheck, MessageSquare } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Browse Services',
    description: 'Explore our wide range of professional services and find exactly what you need for your project.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: UserCheck,
    title: 'Choose Your Provider',
    description: 'Review profiles, ratings, and portfolios to select the perfect professional for your requirements.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MessageSquare,
    title: 'Get Started',
    description: 'Connect directly with your chosen provider and begin your project with confidence and ease.',
    color: 'from-green-500 to-teal-500'
  }
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started with ServiceHUB is simple. Follow these three easy steps to connect with the perfect professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative text-center group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 transform translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-bold text-gray-700 mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
