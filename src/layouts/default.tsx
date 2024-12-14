import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { BadgeAlert, FolderKanban } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const sideBarMenuItems = [
  {
    title: 'Projets',
    url: '/projects',
    icon: FolderKanban
  },
  {
    title: 'Issues',
    url: '/issues',
    icon: BadgeAlert
  }
]

export function DefaultLayout() {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar side="left">
        <SidebarHeader>
          <Link className="truncate font-semibold" to="/">
            Kanban
          </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sideBarMenuItems.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <NavLink to={item.url}>
                      {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <main className="p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
