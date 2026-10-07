import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero container">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Explore India,<br />
            <span className="home-hero-highlight">Your Way</span>
          </h1>
          <p className="home-hero-subtitle">
            AI-powered travel planning, personalized itineraries, and real-time
            safety — all in one place.
          </p>
          <div className="home-hero-actions">
            <button className="btn btn-primary btn-lg">Start Planning</button>
            <button className="btn btn-secondary btn-lg">Explore Destinations</button>
          </div>
        </div>
      </section>

      <section className="home-features container">
        <div className="grid gap-6 home-features-grid">
          <FeatureCard
            icon="🤖"
            title="AI Travel Assistant"
            description="Get personalized recommendations, generate itineraries, and modify plans through natural conversation."
          />
          <FeatureCard
            icon="🗺️"
            title="Interactive Maps"
            description="Explore destinations, find nearby services, and navigate your trip with interactive maps."
          />
          <FeatureCard
            icon="🛡️"
            title="Safety Center"
            description="Quick access to emergency services, SOS workflow, and real-time safety information."
          />
          <FeatureCard
            icon="💰"
            title="Expense Tracking"
            description="Track spending, manage budgets, and get insights — all in Indian Rupees."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card feature-card">
      <div className="card-body">
        <span className="feature-card-icon">{icon}</span>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-desc">{description}</p>
      </div>
    </div>
  );
}
