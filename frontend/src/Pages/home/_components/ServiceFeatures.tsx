const services = [
  {
    title: "Free Shipping",
    description: "Free shipping over $99",
    icon: "🚚",
  },
  {
    title: "30 Days Money Back",
    description: "30 days money back guarantee",
    icon: "↩️",
  },
  {
    title: "100% Secure Payment",
    description: "Your payment is completely secure",
    icon: "🔒",
  },
  {
    title: "24/7 Dedicated Support",
    description: "We're here to help anytime",
    icon: "🎧",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex items-center gap-4 border-b p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl">
              {service.icon}
            </div>

            <div>
              <h3 className="text-sm font-semibold">{service.title}</h3>

              <p className="mt-1 text-xs text-gray-500">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
