import type { IResourceItem } from "@refinedev/core";

import {
  AuditOutlined,
  ClusterOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  PicRightOutlined,
  UserOutlined,
  UsergroupAddOutlined,
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
    name: "scenario",
    list: "/scenarios",
    create: "/scenarios/create",
    show: "/scenarios/show/:id",
    meta: {
      label: "Scenarios",
      icon: <ClusterOutlined />,
    },
  },
  {
    name: "steps",
    list: "/scenarios/config/:id",
    create: "/scenarios/config/:id/create",
    edit: "/scenarios/config/:id/edit/:id",
    meta: {
      hide: true,
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
    name: "user",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      label: "Users",
      canDelete: true,
      icon: <UserOutlined />,
    },
  },
  {
    name: "group",
    list: "/groups",
    create: "/groups/create",
    edit: "/groups/edit/:id",
    show: "/groups/show/:id",
    meta: {
      label: "Group",
      canDelete: true,
      icon: <UsergroupAddOutlined />,
    },
  },
  {
    name: "group-user",
    list: "/groups/:id/users",
    meta: {
      hide: true
    },
  },
  {
    name: "template",
    list: "/template",
    create: "/template/create",
    edit: "/template/edit/:id",
    show: "/template/show/:id",
    meta: {
      label: "Templates",
      canDelete: true,
      icon: <PicRightOutlined />,
    },
  },
  {
    name: "email/vendor",
    list: "/email-vendors",
    create: "/email-vendors/create",
    edit: "/email-vendors/edit/:id",
    show: "/email-vendors/show/:id",
    meta: {
      label: "Email Vendors",
      canDelete: true,
      icon: <AuditOutlined />,
    },
  },
  {
    name: "system-config",
    list: "/system-config",
    meta: {
      label: "System config",
      canDelete: true,
      icon: <CustomerServiceOutlined />,
    },
  },
  // {
  //   name: "step",
  //   list: "/steps",
  //   create: "/steps/create",
  //   edit: "/steps/edit/:id",
  //   show: "/steps/show/:id",
  //   meta: {
  //     canDelete: true,
  //     hide: true
  //   },
  // },
  {
    name: "message",
    list: "/messages",
    create: "/messages/create",
    edit: "/messages/edit/:id",
    show: "/messages/show/:id",
    meta: {
      label: "Messages",
      canDelete: true,
      hide: true,
    },
  },
];
