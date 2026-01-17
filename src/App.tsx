import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Providers } from "./providers";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import { CreateBlogForm } from "./components/CreateBlogForm";
import { useState } from "react";
import { PenTool } from "lucide-react";

function PageContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {isHomePage && <Hero />}

      <main className="flex-1 container mx-auto px-4 py-8 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 h-full">

          <aside className={`
            md:col-span-4 lg:col-span-3 
            flex flex-col h-full
            ${location.pathname.includes('/blogs/') && location.pathname !== '/' ? 'hidden md:flex' : 'flex'}
          `}>
            <div className="mb-4 flex items-center justify-between px-1">
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                Stories <span className="text-primary">.</span>
              </h2>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar space-y-1 pb-10">
              <BlogList searchQuery={searchQuery} />
            </div>
          </aside>
          <section className={`
            md:col-span-8 lg:col-span-9 
            flex flex-col h-full rounded-3xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden relative
            ${isHomePage ? 'hidden md:flex' : 'flex'}
          `}>
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="h-full overflow-y-auto custom-scrollbar relative">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="flex h-full flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/20">
                        <PenTool className="h-10 w-10 text-primary opacity-80" />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight text-foreground">
                        Select a story to begin
                      </h3>
                      <p className="text-muted-foreground max-w-sm mt-3 text-lg font-light">
                        Click on any post from the sidebar to read the full article, or <span className="text-primary font-medium cursor-pointer">start writing</span> your own.
                      </p>
                    </div>
                  }
                />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/create" element={<CreateBlogForm />} />
                <Route path="/edit/:id" element={<CreateBlogForm />} />
              </Routes>
            </div>
          </section>
        </div>
      </main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Providers>
      <Router>
        <PageContent />
      </Router>
    </Providers>
  );
}

export default App;