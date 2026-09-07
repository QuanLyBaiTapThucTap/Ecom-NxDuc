const blogPosts = [
  {
    id: 1,
    category: "Technology",
    title: "How to Choose the Best Smart Devices for Your Home",
    date: "May 24, 2024",
  },
  {
    id: 2,
    category: "Buying Guide",
    title: "Things You Should Know Before Buying Electronics",
    date: "May 20, 2024",
  },
  {
    id: 3,
    category: "News",
    title: "The Latest Technology Trends You Should Know",
    date: "May 16, 2024",
  },
];

const BlogSection = () => {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest News & Experience</h2>

          <button
            type="button"
            className="text-sm font-medium underline underline-offset-4"
          >
            View All
          </button>
        </div>

        {/* Posts */}
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              {/* Image placeholder */}
              <div className="flex h-52 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                <span className="text-sm text-gray-400">Blog Image</span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-500">
                  {post.category}
                </p>

                <h3 className="mt-2 line-clamp-2 text-lg font-semibold transition group-hover:underline">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500">{post.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
