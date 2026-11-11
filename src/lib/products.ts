import runningShoes from "@/assets/products/running-shoes.jpg";
import football from "@/assets/products/football.jpg";
import yogaMat from "@/assets/products/yoga-mat.jpg";
import tennisRacket from "@/assets/products/tennis-racket.jpg";
import cyclingHelmet from "@/assets/products/cycling-helmet.jpg";
import basketball from "@/assets/products/basketball.jpg";
import dumbbells from "@/assets/products/dumbbells.jpg";
import swimGoggles from "@/assets/products/swim-goggles.jpg";
import hikingBackpack from "@/assets/products/hiking-backpack.jpg";
import skippingRope from "@/assets/products/skipping-rope.jpg";

export type ProductColour = { name: string; swatch: string };

export type Product = {
  id: string;
  name: string;
  sport: string;
  /** Optional: products without an image fall back to a placeholder. */
  image?: string;
  /** Price in Indian rupees. */
  price: number;
  /** 0–5 */
  rating: number;
  reviewCount: number;
  stock: number;
  colours: ProductColour[];
  summary: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "velocity-pro-running-shoes",
    name: "Velocity Pro Running Shoes",
    sport: "Running",
    image: runningShoes,
    price: 7499,
    rating: 4.6,
    reviewCount: 312,
    stock: 24,
    colours: [
      { name: "Ember Orange", swatch: "#d9631e" },
      { name: "Graphite", swatch: "#3a3b3d" },
      { name: "Glacier White", swatch: "#eceae6" },
    ],
    summary: "Responsive daily trainer with a breathable knit upper.",
    details: [
      "Built for everyday miles and tempo days, the Velocity Pro pairs a supercritical foam midsole with a rocker geometry that rolls you smoothly from heel to toe.",
      "The engineered knit upper flexes where your foot bends and stays locked down where it matters, while a padded heel collar keeps the fit secure on longer runs.",
      "Weight: 255 g (UK 8). Heel-to-toe drop: 8 mm. Rubber outsole with high-wear zones reinforced for road and track.",
    ],
  },
  {
    id: "strike-match-football",
    name: "Strike Match Football",
    sport: "Football",
    image: football,
    price: 1899,
    rating: 4.4,
    reviewCount: 198,
    stock: 41,
    colours: [
      { name: "White / Orange", swatch: "#f2efe9" },
      { name: "Hi-Vis Yellow", swatch: "#e3d93a" },
    ],
    summary: "Size 5 thermo-bonded match ball for grass and turf.",
    details: [
      "A 32-panel thermo-bonded construction gives the Strike Match Football a true, consistent flight and a soft touch off the boot.",
      "Butyl bladder holds air pressure for longer, and the textured PU casing grips in wet conditions.",
      "Size 5, FIFA Basic quality standard. Suitable for natural grass and artificial turf. Ships deflated with inflation instructions.",
    ],
  },
  {
    id: "flowgrip-yoga-mat",
    name: "FlowGrip Yoga Mat",
    sport: "Yoga",
    image: yogaMat,
    price: 2499,
    rating: 4.8,
    reviewCount: 540,
    stock: 3,
    colours: [
      { name: "Sage", swatch: "#8a9d83" },
      { name: "Clay", swatch: "#b8775a" },
      { name: "Charcoal", swatch: "#3b3b3b" },
    ],
    summary: "6 mm non-slip mat with dense cushioning.",
    details: [
      "The FlowGrip Yoga Mat combines a 6 mm natural-rubber base with a closed-cell top layer that stays grippy even during hot, sweaty flows.",
      "Dense cushioning protects knees and wrists without feeling unstable in balancing poses.",
      "Size: 183 × 61 cm. Weight: 2.3 kg. Wipe clean with a damp cloth. Latex-free option not available for this model.",
    ],
  },
  {
    id: "apex-carbon-tennis-racket",
    name: "Apex Carbon Tennis Racket",
    sport: "Tennis",
    image: tennisRacket,
    price: 9999,
    rating: 4.5,
    reviewCount: 87,
    stock: 9,
    colours: [
      { name: "Black / Orange", swatch: "#26262a" },
      { name: "Steel Blue", swatch: "#4a6b8a" },
    ],
    summary: "300 g graphite frame for control and spin.",
    details: [
      "A full-graphite frame with a 100 sq in head gives the Apex Carbon a generous sweet spot, while the 16×19 string pattern helps you generate topspin.",
      "Vibration-dampening technology in the throat keeps off-centre hits comfortable for intermediate and advanced players.",
      "Unstrung weight: 300 g. Balance: 320 mm. Grip size: L3. Supplied pre-strung with a protective cover.",
    ],
  },
  {
    id: "aero-shield-cycling-helmet",
    name: "AeroShield Cycling Helmet",
    sport: "Cycling",
    image: cyclingHelmet,
    price: 4299,
    rating: 4.3,
    reviewCount: 156,
    stock: 0,
    colours: [
      { name: "Matte Black", swatch: "#1f1f21" },
      { name: "Signal Orange", swatch: "#e5701f" },
      { name: "Pearl White", swatch: "#efede8" },
    ],
    summary: "Lightweight road helmet with 18 cooling vents.",
    details: [
      "The AeroShield balances aerodynamics and airflow with 18 channelled vents and an in-moulded polycarbonate shell.",
      "A dial-adjust retention system and anti-microbial pads deliver an all-day fit, and a reflective rear strip adds visibility at dusk.",
      "Weight: 260 g (M). Sizes: S 51–55 cm, M 55–59 cm, L 59–63 cm. Certified to EN 1078.",
    ],
  },
  {
    id: "court-king-basketball",
    name: "Court King Basketball",
    sport: "Basketball",
    image: basketball,
    price: 2199,
    rating: 4.7,
    reviewCount: 263,
    stock: 18,
    colours: [
      { name: "Classic Orange", swatch: "#c9602a" },
      { name: "Midnight", swatch: "#2a2d3a" },
    ],
    summary: "Size 7 composite leather ball for indoor and outdoor play.",
    details: [
      "Deep channels and a pebbled composite-leather cover give the Court King a confident grip for dribbling, passing and shooting.",
      "The wide-channel design and reinforced rubber carcass hold up on outdoor courts while still feeling soft indoors.",
      "Official size 7 (29.5\"). Recommended pressure: 7–9 PSI. Ships inflated.",
    ],
  },
  {
    id: "ironcore-hex-dumbbells",
    name: "IronCore Hex Dumbbells (Pair, 5 kg)",
    sport: "Training",
    image: dumbbells,
    price: 3499,
    rating: 4.6,
    reviewCount: 421,
    stock: 32,
    colours: [{ name: "Matte Black", swatch: "#1e1e1e" }],
    summary: "Rubber-coated hex heads that won't roll away.",
    details: [
      "IronCore Hex Dumbbells feature a solid cast-iron core encased in odour-reduced rubber that protects your floor and keeps noise down.",
      "Knurled chrome handles are ergonomically contoured for a secure grip through presses, rows and curls.",
      "Sold as a pair, 5 kg each. Hexagonal heads prevent rolling. Handle diameter: 33 mm.",
    ],
  },
  {
    id: "tidewave-swim-goggles-set",
    name: "TideWave Swim Goggles Set",
    sport: "Swimming",
    image: swimGoggles,
    price: 1299,
    rating: 4.2,
    reviewCount: 134,
    stock: 57,
    colours: [
      { name: "Ocean Blue", swatch: "#2c5aa0" },
      { name: "Smoke", swatch: "#4b4f55" },
      { name: "Coral", swatch: "#e2725b" },
    ],
    summary: "Mirrored anti-fog goggles with cap and nose clip.",
    details: [
      "The TideWave set includes mirrored, anti-fog goggles with UV protection, a silicone swim cap and a matching nose clip — everything you need for pool or open water.",
      "Soft silicone gaskets seal comfortably around the eyes, and a split head strap with quick-adjust buckles keeps them stable during turns.",
      "Includes a hard protective case. Cap fits head sizes 52–60 cm.",
    ],
  },
  {
    id: "summit-40l-hiking-backpack",
    name: "Summit 40L Hiking Backpack",
    sport: "Hiking",
    image: hikingBackpack,
    price: 5999,
    rating: 4.7,
    reviewCount: 209,
    stock: 6,
    colours: [
      { name: "Charcoal / Orange", swatch: "#3d3e40" },
      { name: "Forest", swatch: "#3e5a44" },
      { name: "Sand", swatch: "#c7b89a" },
    ],
    summary: "Ventilated trail pack with hip-belt pockets.",
    details: [
      "The Summit 40L carries everything for a full-day hike or a light overnighter, with a ventilated mesh back panel that keeps air moving.",
      "Padded hip belt with zip pockets, adjustable sternum strap and trekking-pole loops make it easy to move fast on the trail.",
      "Capacity: 40 L. Weight: 1.25 kg. Ripstop nylon with water-resistant coating. Hydration-sleeve compatible; rain cover included.",
    ],
  },
  {
    id: "rapidspin-skipping-rope",
    name: "RapidSpin Skipping Rope",
    sport: "Training",
    image: skippingRope,
    price: 799,
    rating: 4.1,
    reviewCount: 88,
    stock: 120,
    colours: [
      { name: "Black / Orange", swatch: "#e5701f" },
      { name: "All Black", swatch: "#1c1c1c" },
    ],
    summary: "Adjustable speed rope with ball-bearing handles.",
    details: [
      "The RapidSpin uses sealed ball bearings and a coated steel cable for fast, smooth rotations — ideal for double-unders and conditioning work.",
      "Knurled aluminium handles stay grippy when your hands get sweaty, and the cable length adjusts in seconds with a tool-free lock.",
      "Cable length: up to 3 m (adjustable). Suitable for users up to 198 cm tall.",
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return inr.format(amount);
}

export const LOW_STOCK_THRESHOLD = 5;

export type StockState = "out" | "low" | "in";

export function stockState(stock: number): StockState {
  if (stock <= 0) return "out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low";
  return "in";
}

export function stockLabel(stock: number): string {
  if (stock <= 0) return "Out of stock";
  return `${stock} ${stock === 1 ? "unit" : "units"} available`;
}

export function canAddToCart(product: Pick<Product, "stock">): boolean {
  return product.stock > 0;
}
