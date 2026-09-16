import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "Technology",
    title: "How to Choose the Best Smart Devices for Your Home",
    date: "May 24, 2024",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    category: "Buying Guide",
    title: "Things You Should Know Before Buying Electronics",
    date: "May 20, 2024",
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    category: "News",
    title: "The Latest Technology Trends You Should Know",
    date: "May 18, 2024",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
];

const LatestNews = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
            Latest News & Experience
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Latest News & Experience
          </h2>
        </div>

        <Link
          to="/news"
          className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-500"
        >
          View All
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <Link to={`/news/${item.id}`} className="block overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {item.category}
                </span>

                <span className="text-xs text-gray-400">{item.date}</span>
              </div>

              <Link to={`/news/${item.id}`}>
                <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-gray-900 transition-colors duration-200 group-hover:text-gray-600">
                  {item.title}
                </h3>
              </Link>

              <Link
                to={`/news/${item.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                Read More
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
