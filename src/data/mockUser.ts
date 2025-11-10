export type MockUser = {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'farmer';
};

export const mockUsers: MockUser[] = [
  {
    name: "Mary",
    email: "mary@mgmail.com",
    password: "123456", 
    role: "buyer",
  },
  {
    name: "John Farmer",
    email: "john@mgmail.com",
    password: "farmer", 
    role: "farmer",
  },
];

export const mockAccount = {
  profile: {
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    shipping: "123 Main St, City, Country",
    billing: "456 Billing Rd, City, Country",
  },
  cards: [
    { id: 1, brand: "Visa", last4: "1234", exp: "12/25" },
    { id: 2, brand: "Mastercard", last4: "5678", exp: "09/24" },
  ],
  coupons: [
    { code: "AGRI10", desc: "10% off on all products" },
    { code: "FREESHIP", desc: "Free shipping on orders over $50" },
  ],
  loyaltyPoints: 120,
  shortcutOrders: [
    {
      id: 'ORD12345',
      date: '2024-06-10',
      total: 150000,
      status: 'Delivered',
    },
    {
      id: 'ORD12346',
      date: '2024-06-07',
      total: 89000,
      status: 'Shipped',
    },
    {
      id: 'ORD12347',
      date: '2024-06-01',
      total: 19999,
      status: 'Pending',
    },
  ],
};

