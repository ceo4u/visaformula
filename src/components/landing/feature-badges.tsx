'use client'

export function FeatureBadges() {
  const features = [
    {
      icon: '🛡️',
      title: 'Verified',
      description: 'Vetted professionals you can trust'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Consultations',
    },
    {
      icon: '💰',
      title: 'Transparent',
      description: 'Pricing'
    },
    {
      icon: '✨',
      title: 'Thousands of',
      description: 'Success Stories'
    }
  ]

  return (
    <section className="w-full py-12 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
