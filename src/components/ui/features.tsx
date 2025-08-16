'use client'

import { useState } from 'react'
import { 
  Bot, 
  Cpu, 
  Database, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Brain
} from 'lucide-react'

interface Feature {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  benefits: string[]
  color: string
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  className?: string
}

export function Features({ 
  title = "Powerful AI Features",
  subtitle = "Discover the cutting-edge capabilities that set us apart",
  features: propFeatures,
  className = ""
}: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState(0)

  // Default features data
  const defaultFeatures = [
    {
      id: 1,
      title: "Advanced Machine Learning",
      description: "Our proprietary algorithms continuously learn and improve from your data, providing increasingly accurate insights and predictions.",
      icon: Brain,
      benefits: [
        "Self-improving algorithms",
        "Real-time learning",
        "Custom model training",
        "Performance optimization"
      ],
      color: "purple"
    },
    {
      id: 2,
      title: "Real-time Processing",
      description: "Process massive amounts of data in real-time with our high-performance computing infrastructure.",
      icon: Cpu,
      benefits: [
        "Millisecond response times",
        "Scalable architecture",
        "High availability",
        "Low latency"
      ],
      color: "blue"
    },
    {
      id: 3,
      title: "Intelligent Data Management",
      description: "Automatically organize, clean, and prepare your data for AI processing with smart data management.",
      icon: Database,
      benefits: [
        "Automatic data cleaning",
        "Smart categorization",
        "Data quality scoring",
        "Version control"
      ],
      color: "green"
    },
    {
      id: 4,
      title: "Natural Language Understanding",
      description: "Understand context, sentiment, and intent in human language with advanced NLP capabilities.",
      icon: MessageSquare,
      benefits: [
        "Context awareness",
        "Sentiment analysis",
        "Intent recognition",
        "Multi-language support"
      ],
      color: "orange"
    },
    {
      id: 5,
      title: "Predictive Analytics",
      description: "Forecast future trends and behaviors with our advanced predictive modeling algorithms.",
      icon: TrendingUp,
      benefits: [
        "Trend forecasting",
        "Risk assessment",
        "Demand prediction",
        "Performance optimization"
      ],
      color: "indigo"
    },
    {
      id: 6,
      title: "Computer Vision",
      description: "Extract meaningful information from images and videos with our advanced computer vision AI.",
      icon: Eye,
      benefits: [
        "Object recognition",
        "Image classification",
        "Video analysis",
        "Quality control"
      ],
      color: "red"
    }
  ];

  const features = propFeatures || defaultFeatures;

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'purple': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'green': 'bg-green-500/10 text-green-500 border-green-500/20',
      'orange': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      'red': 'bg-red-500/10 text-red-500 border-red-500/20',
      'indigo': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
    }
    return colorMap[color] || colorMap['blue']
  }

  return (
    <section className={`py-24 px-6 relative overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">Advanced AI Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                  activeFeature === index
                    ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-blue-500/5 shadow-2xl shadow-purple-500/20 scale-105'
                    : 'border-white/10 bg-black/20 hover:border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-blue-500/5 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-102'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(feature.color)}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Feature Details */}
          <div className="relative">
            <div className="bg-gradient-to-br from-black/80 to-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-50" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(features[activeFeature].color)}`}>
                {(() => {
                  const IconComponent = features[activeFeature].icon;
                  return <IconComponent className="w-8 h-8" />;
                })()}
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {features[activeFeature].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {features[activeFeature].description}
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {features[activeFeature].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${getColorClasses(features[activeFeature].color).split(' ')[0]}`} />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors group">
                  <span className="font-semibold">Learn More</span>
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export type { FeaturesProps, Feature }