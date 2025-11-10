import Link from "next/link";
import { usePathname } from "next/navigation";

const serviceTabs = [
  { name: "Farm Consultation", href: "/services/farm-consultation" },
  { name: "Soil Testing", href: "/services/soil-testing" },
  { name: "Irrigation Setup", href: "/services/irrigation-setup" },
  { name: "Pest Control", href: "/services/pest-control" },
  { name: "Crop Planning", href: "/services/crop-planning" },
];

export default function ServiceFilterBar() {
  const pathname = usePathname();

  return (
    <div className="mb-10">
      <h2 className="text-4xl font-bold mb-2 text-center">
        <span className="text-black">farmMart</span>{" "}
        <span className="text-orange-700">Services</span>
      </h2>
      <p className="text-gray-700 text-center max-w-2xl mx-auto mb-4">
        farmMart empowers farmers with expert services tailored to every stage
        of the agricultural journey.
      </p>
      <div className="flex items-center gap-2 justify-center">
        {serviceTabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-2 rounded-lg font-medium ${
              pathname === tab.href
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-orange-50"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

