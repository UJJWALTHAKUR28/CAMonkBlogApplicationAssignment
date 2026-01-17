import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm mt-auto z-10 relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                    <div className="md:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <PenTool className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">CAMONK</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed pr-4">
                            A sanctuary for thought-provoking stories and deep expertise.
                            Connecting writers and readers through a seamless, distraction-free platform.
                        </p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <h3 className="font-bold text-foreground">Discover</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">Trending Stories</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">Editor's Picks</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">Topic Collections</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <h3 className="font-bold text-foreground">Community</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/create" className="hover:text-primary transition-colors">Write a Story</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">Become a Partner</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">Guidelines</Link></li>
                            <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div>
                        © {new Date().getFullYear()} Camonk Platform. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link>

                    </div>
                </div>
            </div>
        </footer>
    );
}