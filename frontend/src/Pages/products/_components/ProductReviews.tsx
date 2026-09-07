import type { Product } from "../_types/product";

interface ProductReviewsProps {
  product: Product;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const reviews = product.reviews ?? [];

  const rating = product.rating.rate;
  const totalReviews = product.rating.count;

  const ratingDistribution = [
    {
      star: 5,
      percent: 85,
    },
    {
      star: 4,
      percent: 10,
    },
    {
      star: 3,
      percent: 3,
    },
    {
      star: 2,
      percent: 1,
    },
    {
      star: 1,
      percent: 1,
    },
  ];

  return (
    <section className="border-t border-gray-200 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-900">
          Customer Reviews & Experiences
        </h2>

        <p className="mt-1 text-[11px] text-gray-400">
          See what our customers think about this product
        </p>
      </div>

      {/* Rating summary */}
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-[180px_minmax(0,1fr)]">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {rating.toFixed(1)}
          </span>

          <div className="mt-2 flex items-center gap-0.5 text-lg text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>{index < Math.round(rating) ? "★" : "☆"}</span>
            ))}
          </div>

          <p className="mt-2 text-[11px] text-gray-500">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating distribution */}
        <div className="flex flex-col justify-center gap-2">
          {ratingDistribution.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <span className="w-7 text-right text-[10px] font-medium text-gray-600">
                {item.star} ★
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-900 transition-all"
                  style={{
                    width: `${item.percent}%`,
                  }}
                />
              </div>

              <span className="w-8 text-[10px] text-gray-400">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">
            Customer Experiences
          </h3>

          <span className="text-[10px] text-gray-400">
            {reviews.length} recent reviews
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
            <p className="text-xs font-medium text-gray-500">No reviews yet</p>

            <p className="mt-1 text-[10px] text-gray-400">
              Be the first customer to review this product.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
            {reviews.map((review) => (
              <article key={review.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* User */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xs font-semibold text-gray-900">
                          {review.userName}
                        </h4>

                        {review.verified && (
                          <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-semibold text-green-600">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex shrink-0 items-center gap-0.5 text-xs text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        {index < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-4 text-xs leading-6 text-gray-600">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Review CTA */}
      <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl bg-gray-50 px-5 py-4 sm:flex-row">
        <div>
          <p className="text-xs font-semibold text-gray-900">
            Have you used this product?
          </p>

          <p className="mt-0.5 text-[10px] text-gray-500">
            Share your experience with other customers.
          </p>
        </div>

        <button
          type="button"
          className="h-9 rounded-lg bg-gray-900 px-4 text-[11px] font-bold text-white transition hover:bg-black"
        >
          Write a Review
        </button>
      </div>
    </section>
  );
};

export default ProductReviews;
