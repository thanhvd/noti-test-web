import { Authenticated } from "@refinedev/core";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "@/components/header";
import { UserCreate, UserEdit, UserList, UserShow } from "@/pages/users";
import {
  ScenarioCreate,
  ScenarioEdit,
  ScenarioList,
  ScenarioShow,
} from "@/pages/scenarios";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "@/pages/categories";
import { ForgotPassword } from "@/pages/forgotPassword";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { KanbanCreateStage, KanbanPage } from "@/pages/scenario-config";
import { KanbanCreatePage } from "@/pages/scenario-config/create";
import { KanbanEditPage } from "@/pages/scenario-config/edit";
import { KanbanEditStage } from "@/pages/scenario-config/edit-stage";
import {
  GroupUserCreate,
  GroupUserEdit,
  GroupUserList,
  GroupUserShow,
} from "@/pages/group-users";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateShow,
} from "@/pages/template";
import {
  EmailVendorsCreate,
  EmailVendorsEdit,
  EmailVendorsList,
  EmailVendorsShow,
} from "@/pages/email-vendors";
import {
  MessagesCreate,
  MessagesEdit,
  MessagesList,
  MessagesShow,
} from "@/pages/messages";
import { StepsCreate, StepsEdit, StepsList, StepsShow } from "@/pages/steps";
import { DashboardPage } from "@/pages/dashboard";
import { SystemConfig } from "@/pages/system-config";
import { UserMessageList } from "@/pages/user-messages/list";

function AppRouter() {
  return (
    <Routes>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          >
            <ThemedLayoutV2
              Header={() => <Header sticky />}
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
              Title={(props) => (
                <ThemedTitleV2
                  {...props}
                  text="Failover Manager"
                  icon={
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-failover-big-data-flaticons-flat-flat-icons.png"
                      alt="Failover Manager"
                    />
                  }
                />
              )}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        {/* <Route
          index
          element={<NavigateToResource resource="users" />}
        /> */}
        <Route index element={<DashboardPage />} />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>

        <Route path="/user-messages">
          <Route path=":id" element={<UserMessageList />} />
        </Route>

        <Route path="/group-users">
          <Route index element={<GroupUserList />} />
          <Route path="create" element={<GroupUserCreate />} />
          <Route path="edit/:id" element={<GroupUserEdit />} />
          <Route path="show/:id" element={<GroupUserShow />} />
        </Route>

        <Route path="/template">
          <Route index element={<TemplateList />} />
          <Route path="create" element={<TemplateCreate />} />
          <Route path="edit/:id" element={<TemplateEdit />} />
          <Route path="show/:id" element={<TemplateShow />} />
        </Route>

        <Route path="/email-vendors">
          <Route index element={<EmailVendorsList />} />
          <Route path="create" element={<EmailVendorsCreate />} />
          <Route path="edit/:id" element={<EmailVendorsEdit />} />
          <Route path="show/:id" element={<EmailVendorsShow />} />
        </Route>

        <Route path="/system-config">
          <Route index element={<SystemConfig />} />
        </Route>

        <Route path="/messages">
          <Route index element={<MessagesList />} />
          <Route path="create" element={<MessagesCreate />} />
          <Route path="edit/:id" element={<MessagesEdit />} />
          <Route path="show/:id" element={<MessagesShow />} />
        </Route>

        <Route path="/steps">
          <Route index element={<StepsList />} />
          <Route path="create" element={<StepsCreate />} />
          <Route path="edit/:id" element={<StepsEdit />} />
          <Route path="show/:id" element={<StepsShow />} />
        </Route>

        <Route path="/scenarios">
          <Route index element={<ScenarioList />} />
          <Route path="create" element={<ScenarioCreate />} />
          <Route path="edit/:id" element={<ScenarioEdit />} />
          <Route path="show/:id" element={<ScenarioShow />} />
          <Route
            path="config/:id"
            element={
              <KanbanPage>
                <Outlet />
              </KanbanPage>
            }
          >
            {/* <Route index element={<KanbanPage />} /> */}
            <Route path="create" element={<KanbanCreatePage />} />
            <Route path="edit/:id" element={<KanbanEditPage />} />
            <Route path="stages/create" element={<KanbanCreateStage />} />
            <Route path="stages/edit/:id" element={<KanbanEditStage />} />
          </Route>
        </Route>

        {/* <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route> */}
        <Route path="/scrumboard" element={<Outlet />}>
          <Route
            path="kanban"
            element={
              <KanbanPage>
                <Outlet />
              </KanbanPage>
            }
          >
            <Route path="create" element={<KanbanCreatePage />} />
            <Route path="edit/:id" element={<KanbanEditPage />} />
            <Route path="stages/create" element={<KanbanCreateStage />} />
            <Route path="stages/edit/:id" element={<KanbanEditStage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>

      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
