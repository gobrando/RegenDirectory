import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export default function CategoryGrid() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-earth-light rounded-xl p-6 text-center animate-pulse">
            <div className="h-8 w-8 bg-gray-300 rounded mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/directory?category=${category.slug}`}
          className="bg-earth-light hover:bg-regen-tan/20 rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 group"
        >
          <div className="text-regen-forest text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
            <i className={category.icon}></i>
          </div>
          <h4 className="font-semibold text-earth-dark">{category.name}</h4>
        </Link>
      ))}
    </div>
  );
}
