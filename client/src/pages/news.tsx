import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Newspaper,
  ExternalLink,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Leaf,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  source: string;
  sourceUrl: string;
  category: string;
  imageUrl: string | null;
}

interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
}

const CATEGORY_ICONS: Record<string, typeof Leaf> = {
  "Regenerative Agriculture": Sprout,
  "Regenerative Farming": Leaf,
  "Regenerative Products": Sparkles,
  "Regenerative Brands": TrendingUp,
  "Soil Health": Globe,
  "Climate & Carbon": Globe,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Regenerative Agriculture": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Regenerative Farming": "bg-green-100 text-green-800 border-green-200",
  "Regenerative Products": "bg-amber-100 text-amber-800 border-amber-200",
  "Regenerative Brands": "bg-blue-100 text-blue-800 border-blue-200",
  "Soil Health": "bg-orange-100 text-orange-800 border-orange-200",
  "Climate & Carbon": "bg-teal-100 text-teal-800 border-teal-200",
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: ["/api/news", activeCategory, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeCategory !== "all") params.set("category", activeCategory);
      params.set("page", page.toString());
      params.set("limit", "20");
      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
  });

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const categories = data?.categories || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-regen-forest/5 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-regen-forest to-regen-teal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-10 w-10 text-white/90" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Regenerative News
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            Stay informed and inspired with the latest articles on regenerative agriculture,
            sustainable brands, soil health, and the people building a regenerative future.
          </p>
          <p className="text-sm text-white/70 mt-3 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Updated every 30 minutes from trusted sources
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-earth-medium" />
            <span className="text-sm font-medium text-earth-medium">Filter by topic:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("all")}
              className={activeCategory === "all"
                ? "bg-regen-forest hover:bg-regen-forest/90 text-white"
                : "border-gray-300 text-earth-dark hover:border-regen-forest hover:text-regen-forest"
              }
            >
              All Topics
            </Button>
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Leaf;
              return (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat)}
                  className={activeCategory === cat
                    ? "bg-regen-forest hover:bg-regen-forest/90 text-white"
                    : "border-gray-300 text-earth-dark hover:border-regen-forest hover:text-regen-forest"
                  }
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        {data && !isLoading && (
          <p className="text-sm text-earth-medium mb-6">
            Showing {data.articles.length} of {data.total} articles
            {activeCategory !== "all" && ` in "${activeCategory}"`}
          </p>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-dark mb-2">
              Unable to load news right now
            </h3>
            <p className="text-earth-medium mb-4">
              Please try again in a few moments.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-regen-forest hover:bg-regen-forest/90 text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Articles */}
        {data && !isLoading && (
          <>
            {data.articles.length === 0 ? (
              <div className="text-center py-16">
                <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-earth-dark mb-2">
                  No articles found
                </h3>
                <p className="text-earth-medium">
                  Try selecting a different topic or check back later for new articles.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {/* Featured Article (first one) */}
                {page === 1 && data.articles.length > 0 && (
                  <a
                    href={data.articles[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-regen-forest/5 to-regen-teal/5 rounded-xl border-2 border-regen-forest/20 p-8 hover:border-regen-forest/40 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-regen-forest text-white border-0">
                        Featured
                      </Badge>
                      <Badge
                        variant="outline"
                        className={CATEGORY_COLORS[data.articles[0].category] || ""}
                      >
                        {data.articles[0].category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-earth-dark mb-3 group-hover:text-regen-forest transition-colors">
                      {data.articles[0].title}
                    </h2>
                    {data.articles[0].snippet && (
                      <p className="text-earth-medium text-lg mb-4 leading-relaxed">
                        {data.articles[0].snippet}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-earth-medium">
                      <span className="font-medium text-regen-forest">
                        {data.articles[0].source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTimeAgo(data.articles[0].pubDate)}
                      </span>
                      <span className="flex items-center gap-1 text-regen-teal group-hover:text-regen-forest transition-colors ml-auto">
                        Read article <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                )}

                {/* Regular Articles */}
                {data.articles.slice(page === 1 ? 1 : 0).map((article, idx) => (
                  <a
                    key={`${article.link}-${idx}`}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-xl border border-gray-100 p-6 hover:border-regen-forest/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={`text-xs ${CATEGORY_COLORS[article.category] || ""}`}
                          >
                            {article.category}
                          </Badge>
                          <span className="text-xs text-earth-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(article.pubDate)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-earth-dark mb-2 group-hover:text-regen-forest transition-colors leading-snug">
                          {article.title}
                        </h3>
                        {article.snippet && (
                          <p className="text-earth-medium text-sm mb-3 line-clamp-2">
                            {article.snippet}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-medium text-regen-forest/80">
                            {article.source}
                          </span>
                          <span className="flex items-center gap-1 text-regen-teal opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                            Read <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="border-gray-300"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-earth-medium">
                  Page {data.page} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border-gray-300"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-regen-forest/10 to-regen-teal/10 py-12 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-earth-dark mb-3">
            Want to support the regenerative movement?
          </h2>
          <p className="text-earth-medium mb-6">
            Every purchase from a regenerative brand helps heal our planet. Explore our
            directory of verified regenerative products.
          </p>
          <a href="/directory">
            <Button
              size="lg"
              className="bg-regen-forest hover:bg-regen-forest/90 text-white font-semibold"
            >
              Browse Regenerative Products
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}