import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Link, Outlet, useParams } from 'react-router-dom'

export function ProjectDetailLayout() {
  const { id } = useParams()

  console.log(id)

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            1
            <SidebarGroupLabel>
              <Link to="/">Kanban</Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link to={`/projects/${id}`}>
                    <span>Project</span>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link to={`/projects/${id}/issues`}>
                    <span>Issues</span>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link to={`/projects/${id}/kanban`}>
                    <span>Kanban</span>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
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
