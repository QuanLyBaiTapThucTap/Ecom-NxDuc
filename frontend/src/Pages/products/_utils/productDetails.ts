import type { Product } from "../_types/product";

export const productDetails: Record<number, Partial<Product>> = {
  1: {
    brand: "Apple",

    oldPrice: 1399.99,

    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800",
      "https://images.unsplash.com/photo-1695048133142-1a20484d5f8c?w=800",
      "https://images.unsplash.com/photo-1695048133142-1a20484d5f8c?w=800",
    ],

    variants: {
      colors: ["Black", "White", "Blue", "Natural Titanium"],

      storages: ["128GB", "256GB", "512GB"],

      rams: ["8GB", "12GB"],

      versions: ["Standard", "Pro", "Pro Max"],
    },

    warranty: "12 months",

    stock: 25,

    promotions: [
      {
        title: "Free shipping",
        description: "Free delivery for orders over $100",
      },
      {
        title: "12-month warranty",
        description: "Official warranty from the manufacturer",
      },
      {
        title: "30-day return",
        description: "Easy return within 30 days",
      },
      {
        title: "0% installment",
        description: "Support installment payment with selected cards",
      },
    ],

    gifts: [
      {
        name: "Premium phone case",
        description: "Free premium protective case",
        image:
          "https://images.unsplash.com/photo-1601593346740-925612772716?w=300",
      },
      {
        name: "Tempered glass",
        description: "Free premium tempered glass",
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300",
      },
    ],

    specifications: [
      {
        label: "Display",
        value: '6.7" OLED Super Retina XDR',
      },
      {
        label: "Resolution",
        value: "2796 x 1290 pixels",
      },
      {
        label: "Processor",
        value: "Apple A17 Pro",
      },
      {
        label: "RAM",
        value: "8GB",
      },
      {
        label: "Storage",
        value: "256GB",
      },
      {
        label: "Rear Camera",
        value: "48MP + 12MP + 12MP",
      },
      {
        label: "Front Camera",
        value: "12MP",
      },
      {
        label: "Battery",
        value: "4441 mAh",
      },
      {
        label: "Operating System",
        value: "iOS",
      },
      {
        label: "Connectivity",
        value: "5G, Wi-Fi 6E, Bluetooth 5.3",
      },
      {
        label: "SIM",
        value: "Nano-SIM + eSIM",
      },
      {
        label: "Weight",
        value: "221g",
      },
    ],

    reviews: [
      {
        id: 1,
        userName: "Nguyen Van A",
        rating: 5,
        comment:
          "Sản phẩm rất tốt, máy đẹp, hiệu năng mạnh và giao hàng khá nhanh.",
        date: "2026-08-20",
        verified: true,
      },
      {
        id: 2,
        userName: "Tran Minh Duc",
        rating: 5,
        comment: "Đóng gói cẩn thận, sản phẩm đúng mô tả. Mình khá hài lòng.",
        date: "2026-08-15",
        verified: true,
      },
      {
        id: 3,
        userName: "Le Hoang",
        rating: 4,
        comment:
          "Máy sử dụng ổn, màn hình đẹp. Giá hơi cao nhưng chất lượng tốt.",
        date: "2026-08-10",
        verified: true,
      },
      {
        id: 4,
        userName: "Pham Thanh",
        rating: 5,
        comment: "Tư vấn nhiệt tình, giao hàng nhanh. Sẽ tiếp tục ủng hộ shop.",
        date: "2026-08-05",
        verified: true,
      },
    ],
  },

  2: {
    brand: "Sony",

    oldPrice: 399.99,

    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    ],

    variants: {
      colors: ["Black", "White", "Silver"],

      versions: ["Standard", "Premium"],
    },

    warranty: "12 months",

    stock: 18,

    promotions: [
      {
        title: "Free shipping",
        description: "Free delivery nationwide",
      },
      {
        title: "Official warranty",
        description: "12-month official warranty",
      },
      {
        title: "30-day return",
        description: "Return the product within 30 days",
      },
    ],

    gifts: [
      {
        name: "Premium carrying case",
        description: "Free protective carrying case",
        image:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300",
      },
    ],

    specifications: [
      {
        label: "Driver",
        value: "30mm",
      },
      {
        label: "Noise Cancellation",
        value: "Active Noise Cancellation",
      },
      {
        label: "Battery",
        value: "Up to 30 hours",
      },
      {
        label: "Connectivity",
        value: "Bluetooth 5.2",
      },
      {
        label: "Microphone",
        value: "Built-in microphone",
      },
      {
        label: "Weight",
        value: "250g",
      },
    ],

    reviews: [
      {
        id: 1,
        userName: "Minh Anh",
        rating: 5,
        comment: "Chống ồn rất tốt, âm thanh chi tiết và đeo khá thoải mái.",
        date: "2026-08-18",
        verified: true,
      },
      {
        id: 2,
        userName: "Hoang Nam",
        rating: 4,
        comment: "Pin tốt, chất âm hay. Phù hợp để nghe nhạc và làm việc.",
        date: "2026-08-12",
        verified: true,
      },
    ],
  },
};
