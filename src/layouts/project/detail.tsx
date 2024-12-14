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
import {
  BadgeAlert,
  ChartArea,
  ChartGantt,
  Kanban,
  MoveLeft
} from 'lucide-react'
import { Link, Outlet, useParams } from 'react-router-dom'

export function ProjectDetailLayout() {
  const { id } = useParams()

  console.log(id)

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left">
        <SidebarHeader>
          <SidebarMenuButton asChild>
            <Link to="/projects">
              <MoveLeft />
              <span>Projets</span>
            </Link>
          </SidebarMenuButton>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={`/projects/${id}`}>
                  <ChartArea />
                  <span>Statistiques</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={`/projects/${id}/issues`}>
                  <BadgeAlert />
                  <span>Issues</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={`/projects/${id}/kanban`}>
                  <Kanban />
                  <span>Kanban</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={`/projects/${id}/gantt`}>
                  <ChartGantt />
                  <span>Gantt</span>
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
