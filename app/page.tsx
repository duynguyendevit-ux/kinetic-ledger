export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low p-6">
        <div className="mb-10">
          <h1 className="text-headline-lg gradient-primary bg-clip-text text-transparent">
            Kinetic Ledger
          </h1>
          <p className="text-label-sm text-on-surface-variant mt-2">
            Token Dashboard
          </p>
        </div>
        
        <nav className="space-y-2">
          {['Dashboard', 'Providers', 'Tokens', 'Analytics', 'Settings'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 rounded-md bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-10">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-display-lg text-on-surface mb-2">
            2,847,392
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Total tokens processed this month
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Active Providers', value: '12', change: '+3' },
            { label: 'API Calls', value: '45.2K', change: '+12%' },
            { label: 'Avg Latency', value: '234ms', change: '-8%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-high p-8 rounded-xl ambient-shadow"
            >
              <p className="text-label-sm text-on-surface-variant mb-3">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-display-md text-on-surface font-mono">
                  {stat.value}
                </span>
                <span className="text-body-md text-tertiary">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Chart Card */}
        <div className="bg-surface-container p-8 rounded-xl ambient-shadow">
          <h3 className="text-headline-lg text-on-surface mb-6">
            Token Usage
          </h3>
          <div className="h-64 bg-surface-container-low rounded-lg flex items-center justify-center">
            <p className="text-on-surface-variant">Chart placeholder</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-surface-container-high p-8 rounded-xl">
          <h3 className="text-headline-lg text-on-surface mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { provider: 'OpenAI', tokens: '12.4K', time: '2m ago' },
              { provider: 'Anthropic', tokens: '8.9K', time: '5m ago' },
              { provider: 'Google', tokens: '15.2K', time: '12m ago' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg"
              >
                <div>
                  <p className="text-body-md text-on-surface font-medium">
                    {activity.provider}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    {activity.time}
                  </p>
                </div>
                <span className="text-body-lg text-primary font-mono">
                  {activity.tokens}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
