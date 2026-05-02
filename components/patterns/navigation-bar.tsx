import React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, TrendingUp, FileText, Users, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Logo } from "../layout/logo";

/* ── Sub-components ── */

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 min-h-[36px]",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-transparent text-white hover:bg-white/10"
      )}
    >
      <Icon className={cn("size-4", isActive ? "text-primary-foreground" : "text-white")} />
      <span className="text-sm font-medium leading-none tracking-wide">{label}</span>
    </button>
  );
}

interface NavItemWithDropdownProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  items: { label: string; onClick: () => void }[];
}

function NavItemWithDropdown({ icon: Icon, label, isActive, items }: NavItemWithDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 min-h-[36px]",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-white hover:bg-white/10"
          )}
        >
          <Icon className={cn("size-4", isActive ? "text-primary-foreground" : "text-white")} />
          <span className="text-sm font-medium leading-none tracking-wide">{label}</span>
          <ChevronDown className={cn("size-3", isActive ? "text-primary-foreground" : "text-white")} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-secondary border-white/10 text-white">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className="focus:bg-white/10 focus:text-white cursor-pointer"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── NavigationBar ── */

interface NavigationBarProps {
  onLogout?: () => void;
  variant?: "simple" | "full";
}

export function NavigationBar({ onLogout, variant = "full" }: NavigationBarProps) {
  const tenantName = "CESIONBNK";
  const tenantSlug = tenantName.toLowerCase().replace(/\s+/g, "");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-secondary shadow-lg px-6 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex-shrink-0 h-[34px] flex items-center">
          <Logo size="md" variant="dark" />
        </div>
        {variant === "full" && (
          <div className="flex items-center gap-1">
            <NavItem icon={TrendingUp} label="Operations" isActive={true} />
            <NavItemWithDropdown
              icon={FileText}
              label="Radian"
              isActive={false}
              items={[
                { label: "Eventos Radian", onClick: () => console.log("Eventos Radian clicked") },
                { label: "Mandatos", onClick: () => console.log("Mandatos clicked") },
              ]}
            />
            <NavItem icon={Users} label="Vinculaciones" isActive={false} />
          </div>
        )}
      </div>
      {variant === "full" && (
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:bg-white/5 p-1 pr-2 rounded-lg transition-colors outline-none">
                <div className="size-8 rounded-full border border-primary flex items-center justify-center text-primary">
                  <User className="size-5" />
                </div>
                <div className="flex flex-col items-start text-right">
                  <span className="text-white text-xs font-medium tracking-wide">soporte.{tenantSlug}</span>
                  <span className="text-primary text-2xs font-bold tracking-wider uppercase">{tenantName}</span>
                </div>
                <ChevronDown className="size-3 text-white/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-secondary border-white/10 text-white">
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout} className="focus:bg-white/10 focus:text-destructive text-destructive cursor-pointer">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
}