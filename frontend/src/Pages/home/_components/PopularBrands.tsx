// const brands = [
//   "Apple",
//   "Samsung",
//   "Sony",
//   "LG",
//   "Xiaomi",
//   "Microsoft",
//   "Philips",
//   "JBL",
// ];

// const PopularBrands = () => {
//   return (
//     <section className="border-b bg-white">
//       <div className="mx-auto max-w-[1200px] px-4 py-10">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//               Popular Brands
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Shop from the brands you love
//             </p>
//           </div>

//           <button
//             type="button"
//             className="hidden text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
//           >
//             View All
//           </button>
//         </div>

//         {/* Brands */}
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
//           {brands.map((brand) => (
//             <button
//               key={brand}
//               type="button"
//               className="group flex h-[100px] items-center justify-center rounded-lg border border-gray-200 bg-white px-4 transition duration-200 hover:border-black hover:shadow-sm"
//             >
//               <span className="text-lg font-semibold tracking-tight text-gray-500 transition group-hover:text-black">
//                 {brand}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Mobile View All */}
//         <div className="mt-5 text-center sm:hidden">
//           <button
//             type="button"
//             className="text-sm font-medium text-gray-900 underline underline-offset-4"
//           >
//             View All
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularBrands;
import appleLogo from "@/assets/image/brands/apple.jpg";
import samsungLogo from "@/assets/image/brands/samsung.png";
import sonyLogo from "@/assets/image/brands/sony.webp";
import lgLogo from "@/assets/image/brands/lg.webp";
import xiaomiLogo from "@/assets/image/brands/xiaomi.jpg";
import microsoftLogo from "@/assets/image/brands/microsoft.png";
import philipsLogo from "@/assets/image/brands/philips.webp";
import jblLogo from "@/assets/image/brands/jbl.png";

interface Brand {
  name: string;
  logo: string;
}

const brands: Brand[] = [
  {
    name: "Apple",
    logo: appleLogo,
  },
  {
    name: "Samsung",
    logo: samsungLogo,
  },
  {
    name: "Sony",
    logo: sonyLogo,
  },
  {
    name: "LG",
    logo: lgLogo,
  },
  {
    name: "Xiaomi",
    logo: xiaomiLogo,
  },
  {
    name: "Microsoft",
    logo: microsoftLogo,
  },
  {
    name: "Philips",
    logo: philipsLogo,
  },
  {
    name: "JBL",
    logo: jblLogo,
  },
];

const PopularBrands = () => {
  /*
   * Nhân đôi danh sách để tạo hiệu ứng marquee vô tận.
   * Khi nhóm đầu chạy hết, nhóm thứ hai đã nằm ngay phía sau.
   */
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Popular Brands
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Shop from the brands you love
            </p>
          </div>

          <button
            type="button"
            className="hidden text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
          >
            View All
          </button>
        </div>
      </div>

      {/* Infinite Brand Slider */}
      <div className="relative overflow-hidden pb-10">
        <div className="brand-marquee flex w-max">
          {marqueeBrands.map((brand, index) => (
            <button
              key={`${brand.name}-${index}`}
              type="button"
              aria-label={`Shop ${brand.name}`}
              className="group mx-2 flex h-[100px] w-[150px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 transition duration-200 hover:border-black hover:shadow-sm"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="max-h-[48px] max-w-[105px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View All */}
      <div className="mx-auto max-w-[1200px] px-4 pb-6 text-center sm:hidden">
        <button
          type="button"
          className="text-sm font-medium text-gray-900 underline underline-offset-4"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default PopularBrands;
