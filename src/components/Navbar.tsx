import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, PenTool, Home, Plus, Sun, Moon, Menu, X, BookOpen, LayoutGrid } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    searchQuery?: string;
    onSearchChange?: (value: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 border-b",
            scrolled
                ? "bg-background/80 backdrop-blur-xl border-border/60 shadow-sm"
                : "bg-background/0 border-transparent"
        )}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">

                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                            <PenTool className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                            CAMONK
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "text-sm font-medium transition-all rounded-full px-4",
                                    isActive("/")
                                        ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                            >
                                <Home className="h-4 w-4 mr-2" />
                                Home
                            </Button>
                        </Link>
                        <Link to="/blogs">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "text-sm font-medium transition-all rounded-full px-4",
                                    isActive("/blogs")
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                            >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Stories
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 items-center max-w-sm mx-4 lg:mx-8">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search stories..."
                            className="w-full h-10 rounded-full border border-border/50 bg-secondary/50 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                            value={searchQuery || ""}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />

                    <Link to="/create">
                        <Button size="sm" className={cn(
                            "hidden sm:flex rounded-full px-6 transition-all shadow-lg hover:-translate-y-0.5",
                            isActive("/create")
                                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30"
                                : "bg-primary hover:bg-emerald-600 shadow-emerald-500/20"
                        )}>
                            <Plus className="h-4 w-4 mr-1.5" />
                            Write
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-muted-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl p-4 space-y-4 animate-in slide-in-from-top-2 absolute w-full shadow-2xl z-40">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-10 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                            value={searchQuery || ""}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="ghost" className={cn("w-full justify-start h-11", isActive("/") && "bg-primary/10 text-primary")}>
                                <Home className="h-4 w-4 mr-3" /> Home
                            </Button>
                        </Link>
                        <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start h-11">
                                <LayoutGrid className="h-4 w-4 mr-3" /> Browse Stories
                            </Button>
                        </Link>
                        <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full justify-start h-11 mt-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20" variant="outline">
                                <Plus className="h-4 w-4 mr-3" /> Write a story
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}