import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type NewBlog } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon, ArrowLeft, Eye, Edit3, Save, X, AlertCircle, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function CreateBlogForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isPreview, setIsPreview] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [imageLoadError, setImageLoadError] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
    });

    const createMutation = useMutation({
        mutationFn: api.createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            navigate("/");
        },
    });

    useEffect(() => {
        setImageLoadError(false);
    }, [formData.coverImage]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!formData.title || formData.title.length < 5) {
            newErrors.title = "Title must be at least 5 characters.";
            isValid = false;
        }

        if (!formData.category || formData.category.length < 3) {
            newErrors.category = "Category tags must be at least 3 characters.";
            isValid = false;
        }

        if (!formData.description || formData.description.length < 5) {
            newErrors.description = "Summary must be at least 5 characters.";
            isValid = false;
        }

        if (!formData.content || formData.content.length < 10) {
            newErrors.content = "Story content must be at least 10 characters.";
            isValid = false;
        }

        const urlPattern = /^(https?:\/\/)/i;
        if (formData.coverImage && !urlPattern.test(formData.coverImage)) {
            newErrors.coverImage = "Please enter a valid URL starting with http:// or https://";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newBlog: NewBlog = {
            title: formData.title,
            category: formData.category.split(",").map(c => c.trim().toUpperCase()).filter(c => c !== ""),
            description: formData.description,
            coverImage: formData.coverImage,
            content: formData.content,
            date: new Date().toISOString(),
        };
        createMutation.mutate(newBlog);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate("/")} className="pl-0 hover:bg-transparent hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Button>

                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-full border border-border/50">
                    <Button
                        size="sm"
                        variant={!isPreview ? "default" : "ghost"}
                        onClick={() => setIsPreview(false)}
                        className={cn("rounded-full px-6 transition-all", !isPreview && "shadow-md")}
                    >
                        <Edit3 className="h-3.5 w-3.5 mr-2" /> Write
                    </Button>
                    <Button
                        size="sm"
                        variant={isPreview ? "default" : "ghost"}
                        onClick={() => setIsPreview(true)}
                        className={cn("rounded-full px-6 transition-all", isPreview && "bg-primary text-white shadow-md")}
                    >
                        <Eye className="h-3.5 w-3.5 mr-2" /> Preview
                    </Button>
                </div>
            </div>

            <Card className={cn(
                "border-none shadow-2xl shadow-emerald-900/5 overflow-hidden transition-all duration-500",
                isPreview ? "bg-background" : "bg-card"
            )}>
                {!isPreview && <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />}

                <CardContent className="p-0">
                    <form onSubmit={handleSubmit}>

                        <div className={cn("space-y-8 p-6 md:p-10", isPreview ? "hidden" : "block")}>

                            <div className="space-y-2">
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Title of your story..."
                                    className={cn(
                                        "text-4xl md:text-5xl font-extrabold border-none px-0 shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 h-auto py-2 bg-transparent leading-tight",
                                        errors.title && "placeholder:text-red-300"
                                    )}
                                    value={formData.title}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm font-medium flex items-center animate-in slide-in-from-top-1">
                                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className={cn(
                                "space-y-4 p-5 bg-secondary/20 rounded-2xl border border-dashed hover:border-primary/30 transition-colors",
                                errors.coverImage ? "border-red-500/50 bg-red-500/5" : "border-border"
                            )}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-background rounded-md shadow-sm">
                                        <ImageIcon className="h-4 w-4 text-primary" />
                                    </div>
                                    <Label htmlFor="coverImage" className="text-base font-semibold">Cover Image</Label>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        id="coverImage"
                                        name="coverImage"
                                        placeholder="Paste an image URL (https://...)"
                                        className="bg-background"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                    />
                                    {errors.coverImage && (
                                        <p className="text-red-500 text-sm font-medium">{errors.coverImage}</p>
                                    )}
                                </div>

                                {formData.coverImage && !errors.coverImage && (
                                    <div className="relative w-full h-48 md:h-64 mt-2 rounded-lg overflow-hidden bg-muted group border border-border/50">
                                        {!imageLoadError ? (
                                            <img
                                                src={formData.coverImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                onError={() => setImageLoadError(true)}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
                                                <ImageOff className="h-10 w-10 mb-2 opacity-50" />
                                                <span className="text-sm font-medium">Image could not be loaded</span>
                                            </div>
                                        )}

                                        <div className="absolute top-2 right-2">
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                onClick={() => {
                                                    setFormData({ ...formData, coverImage: "" });
                                                    setImageLoadError(false);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="font-semibold">Categories</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        placeholder="e.g., Tech, Lifestyle"
                                        className={cn(
                                            "bg-secondary/30 border-border/50 focus:bg-background transition-colors",
                                            errors.category && "border-red-500/50 focus-visible:ring-red-500/20"
                                        )}
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                    {errors.category ? (
                                        <p className="text-red-500 text-xs font-medium">{errors.category}</p>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">Separate tags with commas (min 3 chars).</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="font-semibold">Short Summary</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Write a hook to grab attention..."
                                        className={cn(
                                            "resize-none h-[88px] bg-secondary/30 border-border/50 focus:bg-background transition-colors",
                                            errors.description && "border-red-500/50 focus-visible:ring-red-500/20"
                                        )}
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs font-medium">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="font-semibold">Story Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Tell your story..."
                                    className={cn(
                                        "min-h-[500px] font-mono text-base leading-relaxed p-6 bg-secondary/10 border-border/50 focus:bg-background focus:ring-1 focus:ring-primary/20 transition-all rounded-xl",
                                        errors.content && "border-red-500/50 focus-visible:ring-red-500/20"
                                    )}
                                    value={formData.content}
                                    onChange={handleChange}
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm font-medium">{errors.content}</p>
                                )}
                            </div>
                        </div>

                        <div className={cn("p-6 md:p-12 animate-in fade-in zoom-in-95 duration-300 min-h-[600px]", !isPreview ? "hidden" : "block")}>
                            {formData.coverImage && !imageLoadError && (
                                <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg bg-muted">
                                    <img
                                        src={formData.coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                </div>
                            )}
                            <div className="max-w-3xl mx-auto">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{formData.title || "Untitled Story"}</h1>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {formData.category.split(',').filter(c => c.trim()).map((cat, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                                            {cat}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xl text-muted-foreground font-serif italic border-l-4 border-primary/40 pl-6 mb-10">
                                    {formData.description || "No description provided."}
                                </p>

                                <div className="prose prose-lg prose-neutral dark:prose-invert prose-emerald max-w-none prose-img:rounded-2xl whitespace-pre-wrap">
                                    {formData.content ? (
                                        formData.content
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            Start writing to see your content here...
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 z-10 bg-background/80 backdrop-blur-lg border-t border-border p-4 flex justify-between items-center">
                            <Button type="button" variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
                                Discard
                            </Button>
                            <div className="flex gap-3">
                                <Button type="submit" size="lg" disabled={createMutation.isPending} className="px-8 rounded-full bg-primary hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5">
                                    <Save className="h-4 w-4 mr-2" />
                                    {createMutation.isPending ? "Publishing..." : "Publish Story"}
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}