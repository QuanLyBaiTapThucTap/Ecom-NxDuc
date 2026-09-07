const Newsletter = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-12 md:flex-row md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-gray-500">
            Newsletter
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Subscribe to our newsletter
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Get the latest updates, offers and new products.
          </p>
        </div>

        <form className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="h-12 min-w-0 flex-1 rounded-l-md border border-r-0 bg-white px-4 text-sm outline-none"
          />

          <button
            type="submit"
            className="h-12 rounded-r-md bg-black px-6 text-sm font-semibold text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
