export default function Services() {
  const services = [
    {
      name: "Frontend Development",
      icon: "/assets/web-icon.png",
      description:
        "Building responsive, accessible, and high-performance user interfaces using modern frontend frameworks and best practices.",
      link: "#projects",
    },
    {
      name: "Web Application Development",
      icon: "/assets/mobile-icon.png",
      description:
        "Developing scalable web applications with clean architecture, API integration, and maintainable codebases.",
      link: "#projects",
    },
    {
      name: "UI Engineering",
      icon: "/assets/ui-icon.png",
      description:
        "Turning designs into pixel-perfect, interactive interfaces with a strong focus on usability and consistency.",
      link: "#projects",
    },
    {
      name: "Product & MVP Development",
      icon: "/assets/graphics-icon.png",
      description:
        "Helping founders and teams bring ideas to life by building MVPs, prototypes, and internal tools efficiently.",
      link: "#projects",
    },
  ];

  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">What I offer</h4>
      <h2 className="text-center text-5xl font-Ovo">My services</h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I build modern software solutions that focus on performance, usability,
        and long-term maintainability. Whether it’s a user interface or a full
        web application, I enjoy creating products that solve real problems.
      </p>

      <div className="grid grid-cols-auto gap-6 my-10">
        {services.map((service) => (
          <div
            key={service.name}
            className="border border-gray-300 dark:border-white/30 rounded-lg px-8 py-12
            hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1
            duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <img src={service.icon} alt="" className="w-10" />
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {service.description}
            </p>
            <a
              href={service.link}
              className="flex items-center gap-2 text-sm mt-5"
            >
              View projects
              <img src="/assets/right-arrow.png" alt="" className="w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
