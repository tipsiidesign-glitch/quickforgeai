import { useCallback, useEffect, useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { formatRelativeDate } from "@/lib/format";

type Notification = Tables<"notifications">;

export function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    setItems(data ?? []);
  }, [user]);

  useEffect(() => {
    load();
    if (!user) return;
    const channel = supabase
      .channel("notifications-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, load]);

  const unread = items.filter((n) => !n.is_read).length;

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const respond = async (notification: Notification, accept: boolean) => {
    if (!notification.related_request_id) return;
    setBusyId(notification.id);
    const { error } = await supabase.rpc("respond_friend_request", {
      _request_id: notification.related_request_id,
      _accept: accept,
    });
    setBusyId(null);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success(accept ? "You are now friends." : "Request declined.");
    load();
  };

  return (
    <Popover open={open} onOpenChange={(next) => { setOpen(next); if (next) load(); }}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} className="relative">
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unread > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(360px,calc(100vw-2rem))] p-0">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
        </div>
        {items.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">No new notifications.</p>
        ) : (
          <ScrollArea className="max-h-80">
            <ul className="divide-y divide-border">
              {items.map((n) => (
                <li key={n.id} className={n.is_read ? "px-4 py-3" : "bg-accent/50 px-4 py-3"}>
                  <button
                    type="button"
                    onClick={() => !n.is_read && markRead(n.id)}
                    className="w-full text-left"
                  >
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatRelativeDate(n.created_at)}</p>
                  </button>
                  {n.type === "friend_request" && n.related_request_id ? (
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" disabled={busyId === n.id} onClick={() => respond(n, true)}>
                        <Check className="mr-1 h-4 w-4" aria-hidden="true" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" disabled={busyId === n.id} onClick={() => respond(n, false)}>
                        <X className="mr-1 h-4 w-4" aria-hidden="true" /> Reject
                      </Button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
