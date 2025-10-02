import { useState, FormEvent, useEffect } from "react";
import { 
  Bot, 
  Paperclip, 
  Mic, 
  CornerDownLeft, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Search,
  UserPlus,
  MoreVertical,
  Shield,
  Mail,
  DollarSign,
  Lock,
  Zap,
  Network,
  Wrench,
  LayoutDashboard,
  Eye,
  Crown,
  UserCog,
  TrendingUp,
  BarChart3,
  Cloud,
  CheckCircle2,
  ArrowRight,
  GripVertical,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
  Power,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Navigation items - Main features first, Admin sections at bottom
const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "finops", label: "FinOps", icon: DollarSign },
  { id: "security", label: "Security", icon: Lock },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "devops", label: "DevOps", icon: Wrench },
  { id: "networking", label: "Networking", icon: Network },
  { id: "users", label: "User Management", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

// Permission levels
const permissionLevels = [
  { value: "view", label: "View", icon: Eye, description: "Read-only access" },
  { value: "power", label: "Power User", icon: UserCog, description: "Can modify resources" },
  { value: "admin", label: "Admin", icon: Crown, description: "Full control" },
];

// Dashboard access categories
const dashboardCategories = [
  { value: "finops", label: "FinOps", icon: DollarSign },
  { value: "security", label: "Security", icon: Lock },
  { value: "automation", label: "Automation", icon: Zap },
  { value: "devops", label: "DevOps", icon: Wrench },
  { value: "networking", label: "Networking", icon: Network },
];

// Mock user data with extended permissions
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Admin",
    permission: "admin",
    dashboards: ["finops", "security", "automation", "devops", "networking"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop",
    lastActive: "2 min ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@company.com",
    role: "FinOps Analyst",
    permission: "power",
    dashboards: ["finops"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&crop=faces&fit=crop",
    lastActive: "1 hour ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    role: "Security Engineer",
    permission: "power",
    dashboards: ["security"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&q=80&crop=faces&fit=crop",
    lastActive: "30 min ago"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@company.com",
    role: "DevOps Manager",
    permission: "power",
    dashboards: ["devops", "automation"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&q=80&crop=faces&fit=crop",
    lastActive: "5 min ago"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@company.com",
    role: "Network Engineer",
    permission: "view",
    dashboards: ["networking"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop",
    lastActive: "Just now"
  }
];

// Feature cards for default view
const features = [
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description: "Save up to 40% on cloud costs with AI-powered recommendations",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Lock,
    title: "Security Compliance",
    description: "Maintain SOC 2, HIPAA, and GDPR compliance automatically",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description: "Deploy infrastructure changes 10x faster with intelligent automation",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get instant insights across all your cloud environments",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Support",
    description: "Manage AWS, Azure, GCP, and OCI from a single platform",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: CheckCircle2,
    title: "99.99% Uptime",
    description: "Enterprise-grade reliability with 24/7 monitoring",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
];

const Dashboard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI assistant for AlterPilot, powered by Reve.Cloud. How can I help you manage your cloud infrastructure today?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatWidth, setChatWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "I'm here to help you with cloud management tasks. You can ask me about AWS, Azure, GCP, or OCI resources, cost optimization, security compliance, and more!",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  // Context-aware search: filters users in User Management tab, features in Dashboard tab
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get search placeholder text based on active tab
  const getSearchPlaceholder = () => {
    switch(activeTab) {
      case 'users':
        return 'Search users by name, email, or role...';
      case 'dashboard':
        return 'Search features...';
      case 'finops':
        return 'Search cost reports, budgets...';
      case 'security':
        return 'Search policies, vulnerabilities...';
      case 'automation':
        return 'Search workflows, triggers...';
      case 'devops':
        return 'Search pipelines, deployments...';
      case 'networking':
        return 'Search VPCs, connections...';
      default:
        return 'Search...';
    }
  };

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth <= 800) {
        setChatWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove as any);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove as any);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to AlterPilot</h2>
            <p className="text-muted-foreground text-sm">powered by Reve.Cloud</p>
            <p className="text-muted-foreground">
              Your unified cloud management platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchQuery ? filteredFeatures : features).map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    {feature.title === "Multi-Cloud Support" ? (
                      <img src="/icons8-cloud-96.png" alt="Cloud" className="h-6 w-6" />
                    ) : (
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-hero text-white">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">Get Started with AI Assistant</CardTitle>
                  <CardDescription className="text-white/80">
                    Start your free trial with 100 AI-powered requests included. Click the floating ✨ Sparkles button at the bottom-right corner to begin managing your infrastructure intelligently.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2"
                onClick={() => setChatOpen(true)}
              >
                Try AI Assistant Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === "users") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">User Management</h2>
              <p className="text-muted-foreground">
                Manage team members, roles, and permissions
              </p>
            </div>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          {user.permission === "admin" && (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last active: {user.lastActive}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Permission Level</label>
                          <Select defaultValue={user.permission}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {permissionLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  <div className="flex items-center gap-2">
                                    <level.icon className="h-4 w-4" />
                                    <div>
                                      <div className="font-medium">{level.label}</div>
                                      <div className="text-xs text-muted-foreground">{level.description}</div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Dashboard Access</label>
                          <div className="flex flex-wrap gap-2">
                            {user.dashboards.map((dashboard) => {
                              const category = dashboardCategories.find(c => c.value === dashboard);
                              return category ? (
                                <Badge key={dashboard} variant="outline" className="gap-1">
                                  <category.icon className="h-3 w-3" />
                                  {category.label}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Manage Dashboards</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Placeholder for other tabs
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-center">
          <div className="mb-4">
            {navigationItems.find(item => item.id === activeTab)?.icon && (
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {(() => {
                  const Icon = navigationItems.find(item => item.id === activeTab)?.icon;
                  return Icon ? <Icon className="h-8 w-8 text-primary" /> : null;
                })()}
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {navigationItems.find(item => item.id === activeTab)?.label}
          </h3>
          <p className="text-muted-foreground mb-4">
            This section is coming soon
          </p>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out bg-card border-r border-border overflow-hidden flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {sidebarOpen ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <img src="/logo-reve.png" alt="Reve Logo" className="h-7 w-auto" />
                    <h2 className="text-lg font-semibold bg-gradient-hero bg-clip-text text-transparent">
                      AlterPilot
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground ml-9">powered by Reve.Cloud</p>
                </div>
              ) : (
                <img src="/logo-reve.png" alt="Reve Logo" className="h-8 w-auto" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-primary/10"
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full gap-2 ${sidebarOpen ? 'justify-start' : 'justify-center px-2'}`}
                onClick={() => setActiveTab(item.id)}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon className="h-4 w-4" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className={`w-full gap-2 text-destructive hover:bg-destructive/10 ${sidebarOpen ? 'justify-start' : 'justify-center px-2'}`}
              title={!sidebarOpen ? "Sign Out" : undefined}
            >
              <Power className="h-4 w-4" />
              {sidebarOpen && <span>Sign Out</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
                title={sidebarOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={getSearchPlaceholder()}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-0" sideOffset={8}>
                  {/* User Info Header with gradient background */}
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 border-b border-border/50">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">Admin User</p>
                        <p className="text-xs text-muted-foreground truncate">admin@alterpilot.com</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>ID:</span>
                          </div>
                          <code className="text-xs bg-background/80 px-1.5 py-0.5 rounded border border-border/50 font-mono font-medium">AP-2024-8X9K2L</code>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="p-1">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive">
                      <Power className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <main 
            className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-background via-background to-primary/5 transition-all"
            style={{
              width: chatOpen ? `calc(100% - ${chatWidth}px)` : '100%',
              transition: isResizing ? 'none' : 'width 0.3s ease-in-out'
            }}
          >
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>

          {/* Resizable AI Chat Panel */}
          {chatOpen && (
            <div className="flex flex-shrink-0" style={{ width: `${chatWidth}px` }}>
              {/* Resize Handle */}
              <div
                className="w-1 bg-border hover:bg-primary cursor-col-resize relative group transition-colors"
                onMouseDown={handleMouseDown}
              >
                <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
                  <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              {/* Chat Panel */}
              <aside 
                className="flex-1 bg-card border-l border-border flex flex-col overflow-hidden"
              >
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-gradient-hero">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-white" />
                      <div>
                        <h3 className="font-semibold text-white">AI Assistant</h3>
                        <p className="text-xs text-white/80">Always here to help</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChatOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-hidden">
                  <ChatMessageList>
                    {messages.map((message) => (
                      <ChatBubble
                        key={message.id}
                        variant={message.sender === "user" ? "sent" : "received"}
                      >
                        <ChatBubbleAvatar
                          className="h-8 w-8 shrink-0"
                          src={
                            message.sender === "user"
                              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                              : "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&q=80&crop=faces&fit=crop"
                          }
                          fallback={message.sender === "user" ? "US" : "AI"}
                        />
                        <ChatBubbleMessage
                          variant={message.sender === "user" ? "sent" : "received"}
                        >
                          {message.content}
                        </ChatBubbleMessage>
                      </ChatBubble>
                    ))}

                    {isLoading && (
                      <ChatBubble variant="received">
                        <ChatBubbleAvatar
                          className="h-8 w-8 shrink-0"
                          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&q=80&crop=faces&fit=crop"
                          fallback="AI"
                        />
                        <ChatBubbleMessage isLoading />
                      </ChatBubble>
                    )}
                  </ChatMessageList>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border">
                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
                  >
                    <ChatInput
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about cloud resources, costs, security..."
                      className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                    <div className="flex items-center p-2 pt-0 justify-between">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        type="submit" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        disabled={!input.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* Floating AI Chat Button */}
        {!chatOpen && (
          <Button
            onClick={() => setChatOpen(true)}
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-primary/80 hover:scale-110 z-50"
          >
            <Sparkles className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #4285f4 0%, #9b72cb 25%, #d96570 50%, #d96570 75%, #4285f4 100%)',
                backgroundSize: '200% 200%',
                animation: 'gemini-glow 3s ease-in-out infinite'
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
