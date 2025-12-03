import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Timer,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Overview() {
  const stats = [
    {
      title: "Total Queues",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Users,
      gradient: "from-primary to-primary-light",
      bgGradient: "from-primary/10 to-primary/5"
    },
    {
      title: "Active Customers",
      value: "847",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      gradient: "from-success to-emerald-400",
      bgGradient: "from-success/10 to-success/5"
    },
    {
      title: "Avg Wait Time",
      value: "8.5m",
      change: "-2.3m",
      trend: "down",
      icon: Clock,
      gradient: "from-warning to-amber-400",
      bgGradient: "from-warning/10 to-warning/5"
    },
    {
      title: "Efficiency Rate",
      value: "94.2%",
      change: "+3.8%",
      trend: "up",
      icon: Target,
      gradient: "from-info to-blue-400",
      bgGradient: "from-info/10 to-info/5"
    }
  ];

  const recentActivity = [
    { id: 1, action: "New customer joined", queue: "Service Desk A", time: "2 min ago", status: "success" },
    { id: 2, action: "Customer served", queue: "Tech Support", time: "5 min ago", status: "complete" },
    { id: 3, action: "Queue threshold reached", queue: "Reception", time: "12 min ago", status: "warning" },
    { id: 4, action: "New queue created", queue: "VIP Service", time: "18 min ago", status: "info" },
    { id: 5, action: "Customer served", queue: "Service Desk B", time: "22 min ago", status: "complete" },
  ];

  const quickActions = [
    { label: "Add Customer", icon: UserPlus, description: "Queue a new customer" },
    { label: "Create Queue", icon: Users, description: "Set up a new queue" },
    { label: "View Reports", icon: BarChart3, description: "Analytics & insights" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-medium">
              <Sparkles className="h-3 w-3 mr-1" />
              Live Dashboard
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your queue operations in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark">
            <Zap className="h-4 w-4" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="relative overflow-hidden border-border/50 hover:shadow-card-hover transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
            <CardContent className="p-5 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-success bg-success/10' : 'text-primary bg-primary/10'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">vs last period</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Real-time queue updates</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary gap-1 text-xs">
                View All
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentActivity.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      activity.status === 'success' ? 'bg-success/10' :
                      activity.status === 'complete' ? 'bg-primary/10' :
                      activity.status === 'warning' ? 'bg-warning/10' :
                      'bg-info/10'
                    }`}>
                      {activity.status === 'success' && <UserPlus className="h-4 w-4 text-success" />}
                      {activity.status === 'complete' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                      {activity.status === 'info' && <Activity className="h-4 w-4 text-info" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.queue}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                      <Timer className="h-3 w-3" />
                      <span className="text-xs">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Common operations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {quickActions.map((action, index) => (
                <Button 
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-muted/50 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <action.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">System Status</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">All systems operational</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { name: "Service Health", status: "Operational" },
                { name: "API Status", status: "Online" },
                { name: "Database", status: "Connected" },
                { name: "Queue Processing", status: "Active" }
              ].map((item, index) => (
                <div 
                  key={item.name}
                  className="flex items-center justify-between py-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-soft" />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-success/10 text-success border-0 text-xs font-medium"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
