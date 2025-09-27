
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LogIn, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = email.split('@')[0]; // Simple name extraction from email
    setUserName(name);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    setUserName(name);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <>
      <header className="w-full sticky top-0 bg-white z-50 border-b border-gray-100 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo (left side) */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <img
                src="/lovable-uploads/9a295041-b715-4e21-8400-d0ea69a1e49e.png"
                alt="Avyukt Core Technology Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-contain"
                loading="lazy"
              />
              <span className="hidden sm:block text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AVYUKT CORE TECHNOLOGIES
              </span>
            </Link>
          </div>
          {/* Desktop Nav links (right side) */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              className="font-semibold"
              asChild
            >
              <Link to="/about" className="no-underline">
                About Us
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="font-semibold"
              asChild
            >
              <Link to="/services" className="no-underline">
                Services
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="font-semibold"
              asChild
            >
              <Link to="/blog" className="no-underline">
                Blog
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="font-semibold"
              asChild
            >
              <Link to="/contact" className="no-underline">
                Contact Us
              </Link>
            </Button>
            
            {/* Login/Signup or User section */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Welcome, {userName}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="ml-2"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="sm:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2">
                  <Link to="/about" className="px-2 py-2 rounded-md text-gray-800 hover:bg-gray-100 no-underline">About Us</Link>
                  <Link to="/services" className="px-2 py-2 rounded-md text-gray-800 hover:bg-gray-100 no-underline">Services</Link>
                  <Link to="/blog" className="px-2 py-2 rounded-md text-gray-800 hover:bg-gray-100 no-underline">Blog</Link>
                  <Link to="/contact" className="px-2 py-2 rounded-md text-gray-800 hover:bg-gray-100 no-underline">Contact Us</Link>
                  <div className="pt-3">
                    {isLoggedIn ? (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        <LogIn className="w-4 h-4 mr-2" /> Login
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-white -z-10 rounded-lg"></div>
          <DialogHeader>
            <DialogTitle className="text-gray-900">Welcome to Avyukt Core Technologies</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="Enter your password"
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-700 font-medium">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    name="name"
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                  <Input 
                    id="signup-email" 
                    name="email"
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="signup-password" 
                    name="password"
                    type="password" 
                    placeholder="Create a password"
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-gray-700 font-medium">Confirm Password</Label>
                  <Input 
                    id="signup-confirm-password" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password"
                    required 
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Note: Sign up is optional. You can access all services without an account.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
