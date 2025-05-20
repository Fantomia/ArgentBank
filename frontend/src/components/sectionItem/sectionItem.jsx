const SectionItem = ({
  title,
  description,
  icon,
  amount,
  customClass = "",
  children,
}) => {
  return (
    <section className={customClass}>
      {icon && <img src={icon} alt={title} className="feature-icon" />}
      <div className={`${customClass}-content-wrapper`}>
        {title && (
          <h3 className={`${customClass}-title`}>{title}</h3>
        )}
        {amount !== undefined && (
          <p className={`${customClass}-amount`}>${amount}</p>
        )}
        {description && (
          <p className={`${customClass}-description`}>{description}</p>
        )}
      </div>
      {children && <div className={`${customClass}-content-wrapper cta`}>{children}</div>}
    </section>
  );
};

export default SectionItem;
