import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden py-16 md:py-28 lg:py-32">

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-background to-background" />

            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center relative z-10">
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 max-w-4xl">
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                        The Community for Developers & Writers
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
                        Words that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">flourish.</span><br />
                        Ideas that <span className="italic font-serif font-light text-foreground/80">matter.</span>
                    </h1>
                    <p className="mx-auto max-w-[650px] text-muted-foreground md:text-xl leading-relaxed font-light">
                        A minimal sanctuary for thought-provoking stories.
                        Distraction-free reading in a world of noise.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/create">
                            <Button size="lg" className="h-12 px-8 rounded-full bg-primary text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-base">
                                Start Writing
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-300/10 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 translate-x-1/3 w-[600px] h-[600px] bg-teal-200/10 dark:bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}