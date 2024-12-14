import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { BadgeAlert, FolderKanban } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/projects">
                  <FolderKanban />
                  <span>Projets</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/issues">
                  <BadgeAlert />
                  <span>Issues</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
