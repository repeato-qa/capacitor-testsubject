import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Import spinner icon

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    setErrorMessage("");
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      console.log("Login successful with:", { email, password });
      navigate("/productcatalog"); // Navigate to product catalog
    }, 750); // Simulate network delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-900">Testing Dummy App</h1>
          <h2 className="text-4l text-center text-gray-600">Your first steps with the Repeato test automation framework</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                required={true} 
                className="mt-1 w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required={true} 
                className="mt-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full text-lg py-3">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          {errorMessage && (
            <div id="error-message" className="text-red-600 text-sm font-medium pt-2 text-center">
              {errorMessage}
            </div>
          )}
        </div>
    </div>
  );
}
