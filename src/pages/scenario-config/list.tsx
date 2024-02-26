/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import _ from "lodash"
import {
  HttpError,
  useCustom,
  useDelete,
  useList,
  useNavigation,
  useParsed,
  useUpdate,
  useUpdateMany,
} from "@refinedev/core";

import { ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DragEndEvent } from "@dnd-kit/core";
import { MenuProps } from "antd";


import {
  KanbanAddCardButton,
  KanbanAddStageButton,
  KanbanBoard,
  KanbanBoardSkeleton,
  KanbanColumn,
  KanbanColumnSkeleton,
  KanbanItem,
  ProjectCardMemo,
  ProjectCardSkeleton,
} from "./components";
import { Task, TaskStage } from "@/graphql/schema.types";
import { NOTIAPI_URL } from "@/utilities";

export const KanbanPage: FC<PropsWithChildren> = ({ children }) => {
  const { create, edit, replace } = useNavigation();

  const {
    resource,
    action,
    id,
    pathname,
    // params: {
    //   filters,
    //   sorters,
    //   current,
    //   pageSize,
    //   ...restParams // TParams - Any other parameters are also parsed and available in `params`
    // },
  } = useParsed();

  const scenarioData = useCustom({
    url: `${NOTIAPI_URL}/scenario/${id}/detail`,
    method: 'get'
  })
  const scenario = scenarioData.data?.data?.data
  const { data } = useList({
    resource: `scenario/${id}/step`,
    // url: `${NOTIAPI_URL}/scenario/${id}/step/list`,
    // method: 'get',

    queryOptions: {
      queryKey: ['get-list-steps'],
      refetchInterval: 5000,
    }
  })

  const steps = data?.data || []

  let groups = steps.reduce((previousValue: any, currentStep: any) => {
    const isExistGroup = previousValue.find((s: any) => s.id === currentStep.groupCode)

    return isExistGroup ? previousValue : [...previousValue, {
      id: currentStep.groupCode,
      title: currentStep.groupName,
      steps: _.orderBy(steps.filter((s: any) => s.groupCode === currentStep.groupCode), 'createdAt', 'desc')
    }]
  }, []) || []
  groups = _.orderBy(groups, 'createdAt', 'asc');

  // const initTasks = steps?.data.filter((task: any) => !task.prevStepId) || []
  const newGroupCode = `${scenario?.name}-${groups.length + 1}`
  const newGroupName = `${scenario?.name}-${groups.length + 1}`
  const stages = [
    ...groups,
    {
      id: newGroupCode,
      title: newGroupName,
      steps: []
    }
  ]

  // const { mutate: updateTask } = useUpdate<
  //     Task,
  //     HttpError,
  //     TaskUpdateInput
  // >();
  // const { mutate: updateManyTask } = useUpdateMany();
  // const { mutate: deleteStage } = useDelete();

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) {
      return;
    }

    if (stageId === "unassigned") {
      stageId = null;
    }

    // updateTask({
    //     resource: "steps",
    //     id: taskId,
    //     values: {
    //         stageId: stageId,
    //     },
    //     successNotification: false,
    //     mutationMode: "optimistic",
    // });
  };

  // const handleAddStage = () => {
  //   create("stepStages", "replace");
  // };

  const handleEditStage = (args: { stageId: string }) => {
    edit("stepStages", args.stageId);
  };

  const handleDeleteStage = (args: { stageId: string }) => {
    // deleteStage({
    //     resource: "stepStage",
    //     id: args.stageId,
    //     successNotification: () => ({
    //         key: "delete-stage",
    //         type: "success",
    //         message: "Successfully deleted stage",
    //         description: "Successful",
    //     }),
    // });
  };

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === "unassigned"
        ? "create"
        : `create?stageId=${args.stageId}`;

    replace(path);
  };

  const handleClearCards = (args: { taskIds: string[] }) => {
    // updateManyTask({
    //     resource: "steps",
    //     ids: args.taskIds,
    //     values: {
    //         stageId: null,
    //     },
    //     successNotification: false,
    // });
  };

  // const getContextMenuItems = (column: any) => {
  //   const hasItems = column.steps.length > 0;

  //   const items: MenuProps["items"] = [
  //     {
  //       label: "Edit status",
  //       key: "1",
  //       icon: <EditOutlined />,
  //       onClick: () => handleEditStage({ stageId: column.id }),
  //     },
  //     {
  //       label: "Clear all cards",
  //       key: "2",
  //       icon: <ClearOutlined />,
  //       disabled: !hasItems,
  //       onClick: () =>
  //         handleClearCards({
  //           taskIds: column.steps.map((task: any) => task.id),
  //         }),
  //     },
  //     {
  //       danger: true,
  //       label: "Delete status",
  //       key: "3",
  //       icon: <DeleteOutlined />,
  //       disabled: hasItems,
  //       onClick: () => handleDeleteStage({ stageId: column.id }),
  //     },
  //   ];

  //   return items;
  // };


  const isLoading = false //isLoadingTasks || isLoadingStages;

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoard onDragEnd={handleOnDragEnd}>
        {stages.map((column) => {
          // const contextMenuItems = getContextMenuItems(column);

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.steps.length}
              // contextMenuItems={contextMenuItems}
              onAddClick={() =>
                handleAddCard({ stageId: column.id })
              }
            >
              {isLoading && <ProjectCardSkeleton />}
              {!isLoading &&
                column.steps.map((task: any) => {
                  const data = {
                    ...task,
                    stageId: column.id,
                  }
                  return (
                    <KanbanItem
                      key={task.id}
                      id={task.id}
                      data={data}
                    >
                      <ProjectCardMemo {...task} data={data} />
                    </KanbanItem>
                  );
                })}
              {!column.steps.length && (
                <KanbanAddCardButton
                  onClick={() =>
                    handleAddCard({ stageId: column.id })
                  }
                />
              )}
            </KanbanColumn>
          );
        })}
        {/* <KanbanAddStageButton onClick={handleAddStage} /> */}
      </KanbanBoard>
      {children}
    </>
  );
};

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardSkeleton>
      {Array.from({ length: columnCount }).map((_, index) => {
        return (
          <KanbanColumnSkeleton key={index} type="project">
            {Array.from({ length: itemCount }).map((_, index) => {
              return <ProjectCardSkeleton key={index} />;
            })}
          </KanbanColumnSkeleton>
        );
      })}
    </KanbanBoardSkeleton>
  );
};
