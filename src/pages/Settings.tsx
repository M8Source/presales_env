import { ThemeToggle } from "@/components/ThemeToggle";
import { ColorThemeToggle } from "@/components/ColorThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Database, 
  Shield, 
  Globe, 
  Clock,
  HardDrive,
  Wifi
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">
            Configure your dashboard preferences and system options
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          Version 2.1.0
        </Badge>
      </div>

      <Separator />

      {/* Theme Settings */}
      <div className="grid gap-6">
        <ThemeToggle />
        <ColorThemeToggle />
      </div>

      {/* Additional Settings Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure alert preferences and notification channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Critical alerts</span>
                <Badge variant="destructive">Immediate</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Database and data retention settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Data retention</span>
                <Badge variant="outline">12 months</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup frequency</span>
                <Badge variant="outline">Daily</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Export format</span>
                <Badge variant="outline">CSV/JSON</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Authentication and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor authentication</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Session timeout</span>
                <Badge variant="outline">30 minutes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API access</span>
                <Badge variant="secondary">Restricted</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Regional Settings
            </CardTitle>
            <CardDescription>
              Localization and regional preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <Badge variant="outline">English (US)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Timezone</span>
                <Badge variant="outline">UTC-05:00</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Currency</span>
                <Badge variant="outline">USD ($)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Current system performance and health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <Wifi className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Connection</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10">
                <Database className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Last Update</p>
                <p className="text-xs text-muted-foreground">2 min ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;