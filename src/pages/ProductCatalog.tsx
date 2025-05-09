import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "../utils/types";
import { useBasketStore } from "../utils/basketStore";
import { ShoppingBasket, PlusCircle, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const placeholderProducts: Product[] = [
  {
    id: "prod-1",
    name: "Aura Wireless Noise-Cancelling Headphones",
    description: "Immerse yourself in pure audio bliss with deep bass, crisp highs, and 30-hour battery life. Perfect for travel and focus.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-2",
    name: "Terra Smart Mug²",
    description: "Keeps your coffee or tea at the perfect temperature for hours. Control with your phone, never sip cold coffee again.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1669128948481-c90e57004176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-3",
    name: "Nova Compact Drone",
    description: "Capture stunning 4K aerial footage with this easy-to-fly compact drone. Features intelligent flight modes and a 2-mile range.",
    imageUrl: "https://images.unsplash.com/photo-1488462104523-514bea5f99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-4",
    name: "Evergreen Potted Succulent Trio",
    description: "Bring life to your desk or windowsill with three unique, low-maintenance succulents in stylish ceramic pots.",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-5",
    name: "Zenith Minimalist Wristwatch",
    description: "Timeless design meets modern simplicity. Sapphire crystal, stainless steel case, and a genuine leather strap.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-6",
    name: "Trailblazer 25L Hiking Backpack",
    description: "Lightweight, durable, and water-resistant. Features multiple compartments and ergonomic support for day hikes or commuting.",
    imageUrl: "https://images.unsplash.com/photo-1474376962954-d8a681cc53b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-7",
    name: "Gourmet Precision Coffee Grinder",
    description: "Unlock the full flavor of your beans with consistent, adjustable grinding. Burr mechanism for the perfect cup every time.",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-8",
    name: "Lumin LED Smart Desk Lamp",
    description: "Adjustable brightness and color temperature to suit your mood and task. USB charging port and sleek, modern design.",
    imageUrl: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-9",
    name: "CozyCloud Knit Throw Blanket",
    description: "Ultra-soft and breathable, this stylish knit throw adds a touch of warmth and comfort to any room.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1672868761628-420b793c65a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-10",
    name: "AquaFlow Insulated Water Bottle",
    description: "Stay hydrated on the go. Keeps drinks cold for 24 hours or hot for 12. Durable, leak-proof, and BPA-free.",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");
  const itemCount = useBasketStore((state) => state.itemCount);
  const addToBasket = useBasketStore((state) => state.addToBasket);

  const handleProductClick = (productName: string) => {
    setSelectedProductName(productName);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-gray-100 shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="pl-6 text-4xl font-bold text-gray-900">Products</h1>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate("/")}
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-center space-x-1">
              <ShoppingBasket className="h-6 w-6 text-gray-700" />
              <Badge variant="secondary" className="text-sm">{itemCount}</Badge>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {placeholderProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleProductClick(product.name)}
            >
              <CardHeader className="p-0">
                <AspectRatio ratio={4 / 3}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-800 mb-1">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2">{product.description}</CardDescription>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dialog from opening
                    addToBasket(product);
                    toast.success(`${product.name} added to basket!`);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add to Basket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Basket?</DialogTitle>
            <DialogDescription>
              {`Would you like to put ${selectedProductName} into the basket?`}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}
