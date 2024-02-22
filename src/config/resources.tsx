import type { IResourceItem } from "@refinedev/core";

import {
  CalendarOutlined,
  ContainerOutlined,
  CrownOutlined,
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "scenarios",
    list: "/scenarios",
    create: "/scenarios/create",
    edit: "/scenarios/edit/:id",
    show: "/scenarios/show/:id",
    meta: {
      label: "Scenarios",
      canDelete: true,
    },
  },
  {
    name: "steps",
    list: "/scenarios/config/:id",
    create: "/scenarios/config/:id/create",
    edit: "/scenarios/config/:id/edit/:id",
    meta: {
      hide: true
    },
  },
  {
    name: "stepStages",
    create: "/scenarios/config/:id/stages/create",
    edit: "/scenarios/config/:id/stages/edit/:id",
    list: "/scenarios/config/:id",
    meta: {
      hide: true,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      label: "Users",
      canDelete: true,
    },
  },
  {
    name: "groupUsers",
    list: "/group-users",
    create: "/group-users/create",
    edit: "/group-users/edit/:id",
    show: "/group-users/show/:id",
    meta: {
      label: "Group Users",
      canDelete: true,
    },
  },
  // {
  //   name: "scrumboard",
  //   meta: {
  //     label: "Scrumboard",
  //     icon: <ProjectOutlined />,
  //   },
  // },
  // {
  //   name: "tasks",
  //   list: "/scrumboard/kanban",
  //   create: "/scrumboard/kanban/create",
  //   edit: "/scrumboard/kanban/edit/:id",
  //   meta: {
  //     label: "Project Kanban",
  //     parent: "scrumboard",
  //   },
  // },
  // {
  //   name: "taskStages",
  //   create: "/scrumboard/kanban/stages/create",
  //   edit: "/scrumboard/kanban/stages/edit/:id",
  //   list: "/scrumboard/kanban",
  //   meta: {
  //     hide: true,
  //   },
  // },
  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/create",
    edit: "/companies/edit/:id",
    meta: {
      label: "Report",
      icon: <ShopOutlined />,
    },
  },
  {
    name: "contacts",
    list: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/edit/:id",
    show: "/contacts/show/:id",
    meta: {
      label: "Push Notification",
      icon: <TeamOutlined />,
    },
  },
];