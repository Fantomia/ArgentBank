import features from '../../data/features.json';
import SectionItem from '../sectionItem/sectionItem';

const AppDesc = () => {
  return (
    <>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => (
          <SectionItem
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            customClass="feature-item"
          />
        ))}
      </section>

    </>
  );
};

export default AppDesc;
