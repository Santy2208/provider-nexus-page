import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Check, Settings } from "lucide-react";

interface CloudProviderCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  variant: "aws" | "azure" | "gcp" | "oracle";
  isConnected?: boolean;
  onConnect: () => void;
  onConfigure?: () => void;
}

export function CloudProviderCard({
  name,
  description,
  icon,
  variant,
  isConnected = false,
  onConnect,
  onConfigure,
}: CloudProviderCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onConnect();
  };

  return (
    <Card className="relative overflow-hidden group hover:shadow-medium transition-all duration-300 border-border/50 hover:border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-card shadow-soft">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge variant={isConnected ? "default" : "secondary"} className="mt-1">
                {isConnected ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </>
                ) : (
                  "Not Connected"
                )}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex space-x-2">
          {!isConnected ? (
            <Button
              variant={variant}
              onClick={handleConnect}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Cloud className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                `Connect ${name}`
              )}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onConfigure} className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button variant={variant} size="sm">
                <Check className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}