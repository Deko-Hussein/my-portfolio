import useLiveCollection from "../hooks/useLiveCollection";

function ServicesSection() {
  const { items: services } = useLiveCollection("/services");

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-3">Services</p>
          <h2 className="text-4xl md:text-5xl font-bold">What I Can Build For You</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="card-ui p-8 hover:-translate-y-1">
              <div className="mb-5 h-14 w-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/20 flex items-center justify-center text-cyan-700 dark:text-cyan-300 text-xl font-bold">
                {service.title?.charAt(0)}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
