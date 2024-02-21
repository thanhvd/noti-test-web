import { Authenticated } from "@refinedev/core";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "@/components/header";
import {
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
} from "@/pages/users";
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
import { KanbanCreateStage, KanbanPage } from "@/pages/scrumboard/kanban";
import { KanbanCreatePage } from "@/pages/scrumboard/kanban/create";
import { KanbanEditPage } from "@/pages/scrumboard/kanban/edit";
import { KanbanEditStage } from "@/pages/scrumboard/kanban/edit-stage";

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
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          index
          element={<NavigateToResource resource="users" />}
        />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>
        <Route path="/scenarios">
          <Route index element={<ScenarioList />} />
          <Route path="create" element={<ScenarioCreate />} />
          <Route path="edit/:id" element={<ScenarioEdit />} />
          <Route path="show/:id" element={<ScenarioShow />} />
        </Route>
        {/* <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route> */}
        <Route
          path="/scrumboard"
          element={<Outlet />}
        >
          <Route path="kanban" element={<KanbanPage><Outlet /></KanbanPage>}>
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
          <Authenticated
            key="authenticated-outer"
            fallback={<Outlet />}
          >
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Route>
    </Routes>
  );
}

export default AppRouter;
