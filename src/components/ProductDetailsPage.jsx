import React from "react";
import { useParams, Link } from "react-router-dom";
import iphoneIcon from "../assets/images/iphone-15.jpg";
import dellIcon from "../assets/images/dell xps.jpg";

const allProducts = [
  {
    id: 1,
    name: "Apple iphone 15",
    price: "$3999",
    imageUrl: iphoneIcon,
    description: `
DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can see who’s calling, track your next ride, check your flight status, and so much more.
INNOVATIVE DESIGN — iPhone 15 features a durable color-infused glass and aluminum design. It’s splash, water, and dust resistant. The Ceramic Shield front is tougher than any smartphone glass. And the 6.1" Super Retina XDR display is up to 2x brighter in the sun compared to iPhone 14.
48MP MAIN CAMERA WITH 2X TELEPHOTO — The 48MP Main camera shoots in super-high resolution. So it’s easier than ever to take standout photos with amazing detail. The 2x optical-quality Telephoto lets you frame the perfect close-up.
NEXT-GENERATION PORTRAITS — Capture portraits with dramatically more detail and color. Just tap to shift the focus between subjects — even after you take the shot.
POWERHOUSE A16 BIONIC CHIP — The superfast chip powers advanced features like computational photography, fluid Dynamic Island transitions, and Voice Isolation for phone calls. And A16 Bionic is incredibly efficient to help deliver great all-day battery life.`,
    box: "Cell phone, Eject Tool, Warranty card, Quick Start Guide, Phone case, Charger, USB cable",
    technicaldetails: ` 
OS :iOS
RAM	:6 GB
Product Dimensions	:0.78 x 7.16 x 14.76 cm; 171 g
Batteries	:1 Lithium Ion batteries required. (included)
Item model number	:MTP03HN/A
Wireless communication technologies	:Bluetooth, Wi-Fi
Connectivity technologies	:Wi‑Fi 6 (802.11ax) with 2x2 MIMO;Bluetooth 5.3
Special features	:Camera, USB
Other display features	:Wireless
Other camera features	‎Front
Form factor	:Bar
Colour	:Black
Battery Power Rating	:0.02 Kilovolts
Whats in the box	:iPhone 15 1N, USB-C Charge Cable
Manufacturer	:Apple
Country of Origin	:China
Item Weight	:171 g `,
    additionalinfo: `Additional Information
ASIN	B0CHX1W1XY
Customer Reviews	4.5 4.5 out of 5 stars    8,190 ratings
4.5 out of 5 stars
Best Sellers Rank	
#21 in Electronics (See Top 100 in Electronics)
#7 in Smartphones
Date First Available	15 September 2023
Manufacturer	Apple, Apple Inc, One Apple Park Way, Cupertino, CA 95014, USA. or Apple India Private Limited No.24, 19th floor, Concorde Tower C, UB City, Vittal Mallya Road, Bangalore - 560 001
Packer	Not Applicable for Apple (Always)
Importer	(If applicable) Apple India Private Limited No.24, 19th floor, Concorde Tower C, UB City, Vittal Mallya Road, Bangalore - 560 001
Item Dimensions LxWxH	8 x 72 x 148 Millimeters
Net Quantity	1 Count
Generic Name	Smartphone`,
  },
  {
    id: 2,
    name: "Dell xps laptop",
    price: "$4599",
    imageUrl: "https://placehold.co/600x400/2ecc71/ffffff?text=Dell+XPS",
    description: "A powerful and sleek laptop for all your professional needs.",
    box: "Laptop, Power Adapter, Warranty Card, Quick Start Guide",
    technicaldetails: `
OS: Windows 11
RAM: 16 GB
Product Dimensions: 1.5 x 30 x 20 cm; 1.2 kg
Batteries: 1 Lithium Ion batteries required. (included)
Wireless communication technologies: Bluetooth, Wi-Fi 6E`,
    additionalinfo: `
ASIN: B0CHX1W1XY
Customer Reviews: 4.2 out of 5 stars
Best Sellers Rank: #45 in Electronics
Date First Available: 10 January 2023
Manufacturer: Dell`,
  },
  {
    id: 3,
    name: "Hp Victus laptop",
    price: "$36500",
    imageUrl: "https://placehold.co/600x400/e74c3c/ffffff?text=HP+Victus",
    description: "A great budget gaming laptop.",
    box: "Laptop, Charger",
    technicaldetails: "OS: Windows 11\nRAM: 8 GB",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 4,
    name: "Xiamomi 11s",
    price: "$1999",
    imageUrl: "https://placehold.co/600x400/f39c12/ffffff?text=Xiaomi+11s",
    description: "A fantastic mid-range smartphone.",
    box: "Phone, Charger",
    technicaldetails: "OS: Android 13\nRAM: 6 GB",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 5,
    name: "Boat Earburds",
    price: "$199",
    imageUrl: "https://placehold.co/600x400/9b59b6/ffffff?text=Boat+Earbuds",
    description: "Wireless earbuds with great bass.",
    box: "Earbuds, Charging Case, USB Cable",
    technicaldetails: "Connectivity: Bluetooth 5.0\nBattery: 20 Hours",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 6,
    name: "Mi charger",
    price: "$49",
    imageUrl: "https://placehold.co/600x400/34495e/ffffff?text=Mi+Charger",
    description: "A fast and reliable charger.",
    box: "Charger",
    technicaldetails: "Output: 20W\nUSB-C",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 7,
    name: "Boat Wired Headphones",
    price: "$49",
    imageUrl: "https://placehold.co/600x400/1abc9c/ffffff?text=Boat+Headphones",
    description: "Headphones with deep bass.",
    box: "Headphones",
    technicaldetails: "Connector: 3.5mm jack\nMic: Yes",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 8,
    name: "Kreo Mouse",
    price: "$499",
    imageUrl: "https://placehold.co/600x400/e67e22/ffffff?text=Kreo+Mouse",
    description: "A high-precision gaming mouse.",
    box: "Mouse, USB Dongle",
    technicaldetails: "DPI: 16000\nButtons: 6",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 9,
    name: "Hp 4 series",
    price: "$2999",
    imageUrl: "https://placehold.co/600x400/d35400/ffffff?text=HP+4+Series",
    description: "A reliable laptop for work.",
    box: "Laptop, Charger",
    technicaldetails: "OS: Windows 11\nRAM: 8 GB",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 10,
    name: "Asus Laptop",
    price: "$3999",
    imageUrl: "https://placehold.co/600x400/c0392b/ffffff?text=Asus+Laptop",
    description: "A powerful gaming laptop.",
    box: "Laptop, Charger",
    technicaldetails: "OS: Windows 11\nRAM: 16 GB",
    additionalinfo: "ASIN: ...",
  },
  {
    id: 11,
    name: "Xiamomi Powerbank",
    price: "$199",
    imageUrl: "https://placehold.co/600x400/8e44ad/ffffff?text=Powerbank",
    description: "A 20000mAh powerbank.",
    box: "Powerbank, USB Cable",
    technicaldetails: "Capacity: 20000mAh\nPorts: 2",
    additionalinfo: "ASIN: ...",
  },
];

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(productId));
  if (!product) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Product Not Found </h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          &larr;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto ">
      {/* <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr;
      </Link> */}
      <div className="grid grid-cols-1 gap-3  ">
        <div className="bg-white flex justify-center rounded-lg p-6 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-96 h-auto object-cover rounded-lg"
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl text-gray-800 mb-4">{product.price}</p>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="w-full bg-orange-500 text-white p-3 rounded-lg text-lg hover:bg-orange-600">
              Buy Now
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Description</h1>
          <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">
            {product.description}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            What's in the box?
          </h1>
          <p className="text-gray-700">{product.box}</p>

          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
            From the manufacturer
          </h1>
          <div className="flex justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className=" w-96 h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className=" bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold mb-2">Technical Details</h2>
              <p className="whitespace-pre-wrap">{product.technicaldetails}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Additional Information
              </h2>
              <p className="whitespace-pre-wrap">{product.additionalinfo}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer reviews & say
          </h1>
          {/* Add review content here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
