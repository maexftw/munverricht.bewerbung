import CodeAmbientBackground from './CodeAmbientBackground';

const PortfolioAtmosphere = () => (
  <div data-portfolio-atmosphere aria-hidden="true" className="pointer-events-none">
    <CodeAmbientBackground />
    <span className="portfolio-radial-glow" />
    <span className="portfolio-bottom-glow" />
    <span className="scanline" />
    <span className="crt-overlay" />
  </div>
);

export default PortfolioAtmosphere;
