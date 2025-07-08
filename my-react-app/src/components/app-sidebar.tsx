"use client";
import {
  BookOpen,
  ChartCandlestick,
  LifeBuoy,
  Send,
  SquareTerminal,
  UserRound,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tools",
      icon: SquareTerminal,
      url: "#",
      isActive: true,
      items: [
        {
          title: "Gửi Mail",
          url: "email-tool",
        },
      ],
    },
    {
      title: "Tài liệu",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Gửi mail",
          url: "docs-email",
        },
      ],
    },
    {
      title: "Thống kê",
      url: "#",
      icon: ChartCandlestick,
      items: [
        {
          title: "Gửi Mail",
          url: "charts-email",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Hỗ trợ",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Phản hồi (ý kiến ib)",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Thành viên",
      url: "#",
      icon: UserRound,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/clb.png" alt="BNA" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    CLB Sách và Hành động
                  </span>
                  <span className="truncate text-xs">Công ty một mình tao</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
