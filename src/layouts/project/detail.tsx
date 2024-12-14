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
import {
  BadgeAlert,
  ChartArea,
  ChartGantt,
  Kanban,
  MoveLeft
} from 'lucide-react'
import { Link, Outlet, useParams } from 'react-router-dom'

const sideBarMenuItems = (id: string) => [
  {
    title: 'Statistiques',
    url: `/projects/${id}`,
    icon: ChartArea
  },
  {
    title: 'Issues',
    url: `/projects/${id}/issues`,
    icon: BadgeAlert
  },
  {
    title: 'Kanban',
    url: `/projects/${id}/kanban`,
    icon: Kanban
  },
  {
    title: 'Gantt',
    url: `/projects/${id}/gantt`,
    icon: ChartGantt
  }
]

export function ProjectDetailLayout() {
  const { id } = useParams()

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
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {id &&
                  sideBarMenuItems(id).map((item) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          {item?.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-2">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
