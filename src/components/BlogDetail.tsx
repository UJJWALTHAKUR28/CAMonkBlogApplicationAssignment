import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    User,
    Clock,
    Share2,
    PlayCircle,
    PauseCircle,
    Check,
    Copy,
    ArrowRight,
} from "lucide-react";

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const shareUrl = window.location.href;
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blogs", id],
        queryFn: () => {
            if (!id) throw new Error("No ID");
            return api.getBlogById(id);
        },
        enabled: !!id,
    });

    const { data: allBlogs } = useQuery({
        queryKey: ["blogs"],
        queryFn: api.getBlogs,
    });
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);
    const toggleSpeech = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else if (blog) {
            const utterance = new SpeechSynthesisUtterance(blog.title + ". " + blog.description + ". " + blog.content);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const relatedBlogs = allBlogs?.filter(b =>
        String(b.id) !== id &&
        b.category.some(c => blog?.category.includes(c))
    ).slice(0, 3);

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 max-w-3xl mx-auto mt-8">
                <Skeleton className="h-[400px] w-full rounded-3xl" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="pt-8 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                <div className="bg-destructive/10 p-4 rounded-full mb-4">
                    <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-xl font-bold">Story not found</h2>
                <p className="text-muted-foreground mt-2 mb-6">The story you are looking for doesn't exist or has been removed.</p>
                <Link to="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-full bg-background animate-in fade-in duration-700 pb-20 relative">

            <div className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300 ease-out" style={{ width: `${scrollProgress * 100}%` }} />

            <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10" />

                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="object-cover w-full h-full fixed-img"
                    style={{ objectPosition: 'center' }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2000&auto=format&fit=crop";
                    }}
                />

                <div className="absolute top-4 left-4 z-20">
                    <Link to="/">
                        <Button size="icon" variant="outline" className="rounded-full bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-32 md:-mt-48">
                <div className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-t-3xl border border-border/50 shadow-2xl shadow-black/10 p-6 md:p-12 pb-12">

                    <div className="space-y-6 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {blog.category.map((cat) => (
                                <span key={cat} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-emerald-300 flex items-center justify-center text-white shadow-lg">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">Camonk Writer</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> 5 min read
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={toggleSpeech} className={cn("rounded-full", isSpeaking && "text-primary bg-primary/10")}>
                                    {isSpeaking ? <PauseCircle className="h-5 w-5 mr-2" /> : <PlayCircle className="h-5 w-5 mr-2" />}
                                    {isSpeaking ? "Listening..." : "Listen"}
                                </Button>
                                <div className="h-6 w-px bg-border/60 mx-1" />

                                <Button variant="ghost" size="sm" onClick={() => setIsShareOpen(true)} className="rounded-full gap-2">
                                    <Share2 className="h-5 w-5" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed mb-10 pl-6 border-l-4 border-primary/40 italic">
                        {blog.description}
                    </p>
                    <div className="prose prose-lg prose-neutral dark:prose-invert prose-emerald max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-p:leading-8 prose-p:text-muted-foreground/90
                        prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-border/50
                        prose-strong:text-foreground prose-strong:font-extrabold
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/30 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:font-serif">
                        {blog.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                            <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                            {blog.category.map(tag => (
                                <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">#{tag}</span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsShareOpen(true)}
                                className="rounded-full gap-2 hover:bg-primary hover:text-white transition-colors"
                            >
                                <Share2 className="h-4 w-4" /> Share Article
                            </Button>
                        </div>
                    </div>
                </div>

                {relatedBlogs && relatedBlogs.length > 0 && (
                    <div className="mt-16 space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-2xl font-bold tracking-tight">More like this</h3>
                            <Link to="/" className="text-sm font-medium text-primary hover:underline flex items-center">
                                View all <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.map((related) => (
                                <Link key={related.id} to={`/blogs/${related.id}`} className="group">
                                    <div className="space-y-3">
                                        <div className="aspect-video rounded-2xl overflow-hidden bg-muted relative">
                                            <img
                                                src={related.coverImage}
                                                alt={related.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{related.category[0]}</div>
                                            <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {related.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-foreground/90 backdrop-blur-lg text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10">
                <button onClick={toggleSpeech} className="flex flex-col items-center gap-0.5">
                    {isSpeaking ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                </button>
                <div className="w-px h-4 bg-background/20" />
                <button onClick={() => setIsShareOpen(true)} className="flex items-center gap-2 font-medium text-sm">
                    <Share2 className="h-5 w-5" /> Share
                </button>
            </div>

            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share this article</DialogTitle>
                        <DialogDescription>
                            Anyone with the link can view this story.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={shareUrl}
                                readOnly
                                className="h-9 bg-muted/50"
                            />
                        </div>
                        <Button type="submit" size="sm" onClick={copyToClipboard} className="px-3">
                            <span className="sr-only">Copy</span>
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </article>
    );
}