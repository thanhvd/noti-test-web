import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "@/providers/auth-provider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { resources } from "./config";
import AppRouter from "./config/router";
import { restDataProvider } from "@/providers/rest-data-provider";
import { notiapiDataProvider } from "./providers/notiapi-data-provider";
import { JSON_SERVER_API_URL, NOTIAPI_URL } from "./utilities";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  default: notiapiDataProvider(NOTIAPI_URL),
                  jsonServer: restDataProvider(JSON_SERVER_API_URL),
                }}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "n92d4V-ELasQw-aRW2OE",
                }}
              >
                <AppRouter />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
