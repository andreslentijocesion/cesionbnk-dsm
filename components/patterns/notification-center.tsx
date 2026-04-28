import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Trash2,
  Check,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success" as const,
    category: "approval",
    title: "Invoice Approved",
    message: "Invoice INV-001 has been approved by Maria Garcia",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "warning" as const,
    category: "pending",
    title: "Review Pending",
    message: "3 invoices require your urgent review",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "error" as const,
    category: "rejection",
    title: "Invoice Rejected",
    message: "Invoice INV-045 was rejected due to incomplete documentation",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "info" as const,
    category: "system",
    title: "System Update",
    message: "New version available with performance improvements",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "success" as const,
    category: "payment",
    title: "Payment Received",
    message: "Payment of $2,500,000 confirmed for INV-023",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 6,
    type: "warning" as const,
    category: "deadline",
    title: "Upcoming Deadline",
    message: "5 invoices expire in the next 24 hours",
    timestamp: "4 hours ago",
    read: true,
  },
];

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: "text-success",
  error: "text-destructive",
  warning: "text-warning",
  info: "text-info",
};

export function NotificationCenter() {
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotificationList(notificationList.filter((n) => n.id !== id));
  };

  const unreadNotifications = notificationList.filter((n) => !n.read);
  const readNotifications = notificationList.filter((n) => n.read);

  const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => {
    const Icon = iconMap[notification.type];

    return (
      <div
        className={`p-4 rounded-lg border transition-colors ${
          notification.read ? "bg-background" : "bg-muted"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 ${colorMap[notification.type]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm">{notification.title}</p>
              {!notification.read && (
                <Badge variant="outline" className="h-2 w-2 p-0 rounded-full" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {notification.timestamp}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleDelete(notification.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 max-w-lg rounded-none border-b">
            <TabsTrigger value="all" className="rounded-none">
              All
              <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                {notificationList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-none">
              Unread
              {unreadCount > 0 && (
                <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read" className="rounded-none">
              Read
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px]">
            <TabsContent value="all" className="m-0 p-4">
              <div className="space-y-3">
                {notificationList.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notificationList.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="m-0 p-4">
              <div className="space-y-3">
                {unreadNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No unread notifications</p>
                  </div>
                ) : (
                  unreadNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="read" className="m-0 p-4">
              <div className="space-y-3">
                {readNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Info className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No read notifications</p>
                  </div>
                ) : (
                  readNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <Separator />

        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}