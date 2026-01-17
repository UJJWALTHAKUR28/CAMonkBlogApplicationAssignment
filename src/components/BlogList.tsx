import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, type Blog } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Clock,
    ChevronRight,
    TrendingUp,
    Code,
    Heart,
    Globe,
    Smartphone,
    Briefcase,
    Zap,
    ArrowUpDown
} from "lucide-react";

interface BlogListProps {
    searchQuery?: string;
}

type SortOption = "latest" | "oldest" | "alphabetical";

export default function BlogList({ searchQuery = "" }: BlogListProps) {
    const [sortBy, setSortBy] = useState<SortOption>("latest");

    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: api.getBlogs,
    });

    const location = useLocation();

    const getCategoryIcon = (category: string) => {
        const c = category.toLowerCase();
        if (c.includes("finance") || c.includes("money") || c.includes("business")) return TrendingUp;
        if (c.includes("tech") || c.includes("code") || c.includes("dev")) return Code;
        if (c.includes("health") || c.includes("life") || c.includes("wellness")) return Heart;
        if (c.includes("mobile") || c.includes("app")) return Smartphone;
        if (c.includes("work") || c.includes("job")) return Briefcase;
        if (c.includes("art") || c.includes("design")) return Zap;
        return Globe;
    };

    const filteredBlogs = blogs
        ?.filter((blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === "latest") return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
            if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
            return 0;
        });

    if (isLoading) {
        return (
            <div className="space-y-4 pt-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col space-y-3 p-5 border border-border/40 rounded-2xl bg-card">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-20 rounded-full" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                        <Skeleton className="h-4 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) return (
        <div className="p-6 text-center rounded-xl bg-destructive/5 border border-destructive/20 text-destructive text-sm mt-4">
            Failed to load stories. Please try again.
        </div>
    );

    if (filteredBlogs?.length === 0) {
        return (
            <div className="py-16 text-center opacity-0 animate-in fade-in slide-in-from-bottom-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                    <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold">No stories found</h3>
                <p className="text-muted-foreground text-sm mt-1">Try searching for a different keyword.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-2 pt-1 mb-2 border-b border-border/40 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {filteredBlogs?.length} Result{filteredBlogs?.length !== 1 ? 's' : ''}
                </span>

                <div className="relative group">
                    <ArrowUpDown className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="h-8 pl-7 pr-3 text-xs font-medium bg-secondary/50 border border-transparent hover:border-border rounded-lg appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                    >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="alphabetical">A-Z</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-3 pb-24 md:pb-4">
                {filteredBlogs?.map((blog: Blog) => {
                    const isActive = location.pathname === `/blogs/${blog.id}`;
                    const primaryCategory = blog.category[0] || 'General';
                    const CategoryIcon = getCategoryIcon(primaryCategory);

                    return (
                        <Link key={blog.id} to={`/blogs/${blog.id}`} className="group block outline-none">
                            <article className={cn(
                                "relative p-5 rounded-2xl transition-all duration-300 border group-hover:shadow-md group-hover:-translate-y-0.5",
                                isActive
                                    ? "bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(var(--primary),0.2)]"
                                    : "bg-card border-border/50 hover:border-primary/30"
                            )}>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors border",
                                            isActive
                                                ? "bg-primary text-white border-primary"
                                                : "bg-primary/5 text-primary border-primary/10 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                                        )}>
                                            <CategoryIcon className="w-3 h-3" />
                                            {primaryCategory}
                                        </div>

                                        <div className="flex items-center text-xs text-muted-foreground font-medium">
                                            <Clock className="w-3 h-3 mr-1.5 opacity-70" />
                                            {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <h3 className={cn(
                                        "font-bold text-lg leading-snug transition-colors line-clamp-2",
                                        isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}>
                                        {blog.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {blog.description}
                                    </p>

                                    {isActive && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-10 hidden md:block">
                                            <ChevronRight className="h-16 w-16" />
                                        </div>
                                    )}
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}