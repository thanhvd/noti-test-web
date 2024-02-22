/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, useMemo } from "react";

import {
  HttpError,
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

// const stages = {
//   "data": [
//     {
//       "id": "1",
//       "title": "TODO"
//     },
//     {
//       "id": "2",
//       "title": "IN PROGRESS"
//     },
//     {
//       "id": "3",
//       "title": "IN REVIEW"
//     },
//     {
//       "id": "4",
//       "title": "DONE"
//     }
//   ],
//   "totalCount": 4
// }

// const tasks = {
//   "data": [
//     {
//       "id": "14",
//       "title": "Facilitate Client Feedback Session",
//       "description": "step: Facilitate Client Feedback Session\n\nDescription: In this task, you will organize and facilitate a feedback session with our clients to gather their insights and opinions. Your excellent communication and interpersonal skills will create a comfortable environment for clients to share candid feedback.\n\nCollaboration with the client success and support teams will help you identify relevant topics and tailor the session to address specific concerns. The feedback received will be invaluable in improving our products/services and strengthening client relationships.\n\nLet's listen to our clients' voices and use their feedback to drive continuous improvement!",
//       "dueDate": "2024-02-20T09:22:49.538Z",
//       "completed": false,
//       "stageId": "4",
//       "checklist": [],
//       "users": [
//         {
//           "id": "16",
//           "name": "Toby Flenderson",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/15.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "6",
//       "title": "Plan Product Launch Strategy",
//       "description": "Task: Plan Product Launch Strategy\n\nDescription: In this task, you will lead the strategic planning for our upcoming product launch. You'll collaborate with cross-functional teams, including product management, marketing, and sales, to define launch objectives and key performance indicators (KPIs).\n\nYour ability to think strategically and anticipate market trends will be essential in crafting a comprehensive launch strategy. You will coordinate marketing campaigns, promotions, and sales enablement efforts to create a successful and impactful product launch.\n\nLet's plan a launch that captures the market's attention and drives substantial demand for our new product!",
//       "dueDate": "2024-02-20T10:54:56.758Z",
//       "completed": false,
//       "stageId": "2",
//       "checklist": [],
//       "users": [
//         {
//           "id": "3",
//           "name": "Jim Halpert",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/2.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "8",
//       "title": "Optimize Website Performance",
//       "description": "Task: Optimize Website Performance\n\nDescription: In this task, you will focus on optimizing our website's performance to enhance user experience and boost search engine rankings. Your technical skills and knowledge of web performance best practices will be critical in identifying and resolving performance bottlenecks.\n\nCollaboration with the web development and design teams will ensure seamless implementation of performance enhancements. You will monitor website metrics and conduct tests to measure the impact of your optimizations.\n\nLet's provide our users with a fast and smooth browsing experience while increasing our website's visibility and accessibility!",
//       "dueDate": "2024-02-20T21:04:26.729Z",
//       "completed": false,
//       "stageId": "2",
//       "checklist": [],
//       "users": [
//         {
//           "id": "14",
//           "name": "Kelly Kapoor",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/13.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "2",
//       "title": "Create Marketing Campaign",
//       "description": "As part of this task, you will be responsible for designing and executing a compelling marketing campaign. The campaign will focus on promoting our latest product/service to our target audience and increasing brand visibility.\n\nYour creativity, market research, and marketing expertise will be instrumental in crafting effective messaging and selecting the right channels for the campaign. Collaboration with the design and content teams will be essential to deliver visually appealing and engaging marketing materials.\n\nLet's create a campaign that resonates with our customers and drives meaningful results!",
//       "dueDate": "2024-02-21T16:27:14.502Z",
//       "completed": false,
//       "stageId": "1",
//       "checklist": [],
//       "users": [
//         {
//           "id": "4",
//           "name": "Pam Beesly",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/3.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "16",
//       "title": "Coordinate Software Testing",
//       "description": "Task: Coordinate Software Testing\n\nDescription: In this task, you will be responsible for coordinating the software testing process to ensure the quality and reliability of our software products. Your attention to detail and knowledge of testing methodologies will be critical in identifying and reporting bugs and issues.\n\nCollaboration with the development and quality assurance teams will help you understand testing requirements and prioritize test cases. Regular communication with stakeholders will keep everyone informed of testing progress and results.\n\nLet's deliver software products that exceed customer expectations and meet the highest quality standards!",
//       "dueDate": "2024-02-21T16:53:17.969Z",
//       "completed": false,
//       "stageId": "4",
//       "checklist": [],
//       "users": [
//         {
//           "id": "1",
//           "name": "Admin User",
//           "avatarUrl": null
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "7",
//       "title": "Review Financial Reports",
//       "description": "Task: Review Financial Reports\n\nDescription: As part of this task, you will review and analyze financial reports to assess our company's financial health and performance. Your expertise in financial analysis and reporting will be vital in identifying trends, risks, and opportunities.\n\nCollaboration with the finance and accounting teams will ensure accurate data and a comprehensive understanding of financial metrics. Your insights and recommendations will contribute to informed decision-making and support our financial objectives.\n\nLet's review the numbers and gain valuable insights into our financial standing and growth prospects!",
//       "dueDate": "2024-02-22T17:08:31.408Z",
//       "completed": false,
//       "stageId": "2",
//       "checklist": [],
//       "users": [
//         {
//           "id": "12",
//           "name": "Meredith Palmer",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/11.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "10",
//       "title": "Design New Logo Concepts",
//       "description": "Task: Design New Logo Concepts\n\nDescription: As part of this task, you will create multiple logo concepts that capture the essence of our brand identity. Your creativity and design expertise will play a pivotal role in developing logos that are visually appealing and resonate with our target audience.\n\nCollaboration with the marketing and branding teams will ensure that the logo concepts align with our brand guidelines and overall marketing strategy. Feedback from stakeholders will guide the iterative design process.\n\nLet's craft a new logo that represents our brand values and sets us apart in the market!",
//       "dueDate": "2024-02-23T06:54:57.490Z",
//       "completed": false,
//       "stageId": "3",
//       "checklist": [],
//       "users": [
//         {
//           "id": "16",
//           "name": "Toby Flenderson",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/15.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "9",
//       "title": "Lead Sales Training Workshop",
//       "description": "Task: Lead Sales Training Workshop\n\nDescription: In this task, you will take the lead in conducting a comprehensive sales training workshop for our sales team. Your expertise in sales techniques, product knowledge, and customer communication will equip our team members with the skills they need to excel.\n\nCollaboration with sales managers and team leads will help you tailor the workshop content to address specific challenges and opportunities. Interactive activities and role-playing scenarios will enhance the learning experience.\n\nLet's empower our sales team with the knowledge and confidence to achieve exceptional sales performance!",
//       "dueDate": "2024-02-24T12:21:29.549Z",
//       "completed": false,
//       "stageId": "3",
//       "checklist": [],
//       "users": [
//         {
//           "id": "2",
//           "name": "Michael Scott",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/1.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "5",
//       "title": "Implement Security Enhancements",
//       "description": "Task: Implement Security Enhancements\n\nDescription: As part of this task, you will be responsible for identifying and implementing security enhancements to safeguard our systems and data. Your expertise in cybersecurity and best practices will be instrumental in mitigating potential risks and vulnerabilities.\n\nCollaboration with the IT and development teams will be essential to ensure that security measures are seamlessly integrated into our existing infrastructure. You will also conduct regular security audits and train team members on security protocols.\n\nLet's prioritize the protection of our digital assets and build a secure environment for our organization!",
//       "dueDate": "2024-02-24T15:02:52.577Z",
//       "completed": false,
//       "stageId": "2",
//       "checklist": [],
//       "users": [
//         {
//           "id": "9",
//           "name": "Kevin Malone",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/8.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "4",
//       "title": "Organize Team Building Event",
//       "description": "Task: Organize Team Building Event\n\nDescription: As the event organizer, you will be responsible for planning and executing a team-building event that fosters teamwork, communication, and collaboration among team members. The event should align with our company values and contribute to a positive work culture.\n\nYour organizational skills and creativity will be essential in choosing suitable activities, selecting a venue, and coordinating logistics. By encouraging participation and engagement, you will create an enjoyable and memorable experience for all team members.\n\nLet's come together as a team and strengthen our bonds through this enriching team-building event!",
//       "dueDate": "2024-02-24T23:33:11.572Z",
//       "completed": false,
//       "stageId": "1",
//       "checklist": [],
//       "users": [
//         {
//           "id": "13",
//           "name": "Ryan Howard",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/12.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "11",
//       "title": "Coordinate Project Kickoff",
//       "description": "Task: Coordinate Project Kickoff\n\nDescription: In this task, you will take charge of coordinating the project kickoff meeting, marking the official start of a new project. Your organizational skills and attention to detail will ensure that all stakeholders are informed and prepared for the project's initiation.\n\nCollaboration with project managers, team leads, and key stakeholders will help you establish project objectives, timelines, and roles. The kickoff meeting is an excellent opportunity to align everyone's expectations and set the project up for success.\n\nLet's kickstart the project with enthusiasm and a shared sense of purpose!",
//       "dueDate": "2024-02-25T05:11:24.967Z",
//       "completed": false,
//       "stageId": "3",
//       "checklist": [],
//       "users": [
//         {
//           "id": "6",
//           "name": "Angela Martin",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/5.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "13",
//       "title": "Write Content for Blog Posts",
//       "description": "Task: Write Content for Blog Posts\n\nDescription: In this task, you will be the voice of our company blog, creating engaging and informative content that resonates with our target audience. Your writing skills and storytelling ability will capture readers' attention and drive traffic to our blog.\n\nCollaboration with the marketing and SEO teams will help you align content topics with marketing objectives and optimize posts for search engines. Incorporating feedback from readers and stakeholders will enhance the quality and relevance of your content.\n\nLet's share valuable insights, industry trends, and exciting stories through compelling blog posts!",
//       "dueDate": "2024-02-25T21:42:03.206Z",
//       "completed": false,
//       "stageId": "4",
//       "checklist": [],
//       "users": [
//         {
//           "id": "14",
//           "name": "Kelly Kapoor",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/13.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "1",
//       "title": "Perform Data Analysis",
//       "description": "In this task, you will analyze the collected data to uncover insights and trends. You'll use various statistical methods, data visualization techniques, and data mining algorithms to process and interpret the data. The goal is to extract valuable information that will aid in making data-driven decisions and improvements to our processes and strategies.\n\nYour analytical skills and attention to detail will play a pivotal role in the successful completion of this task. We encourage you to collaborate with the data science team and other stakeholders to ensure the accuracy and relevance of your findings.\n\nLet's turn raw data into actionable knowledge!",
//       "dueDate": "2024-02-25T22:50:36.528Z",
//       "completed": false,
//       "stageId": "1",
//       "checklist": [],
//       "users": [
//         {
//           "id": "15",
//           "name": "Andy Bernard",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/14.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "12",
//       "title": "Conduct Market Research",
//       "description": "Task: Conduct Market Research\n\nDescription: In this task, you will conduct market research to gain a deeper understanding of our target market, customer preferences, and competitor landscape. Your research findings will inform our marketing, product, and business strategies.\n\nCollaboration with the marketing and product teams will help you define research objectives and design data collection methods. Your analytical skills and data interpretation will provide valuable insights for strategic decision-making.\n\nLet's gather market intelligence that drives our company's growth and competitive advantage!",
//       "dueDate": "2024-02-26T07:04:59.735Z",
//       "completed": false,
//       "stageId": "3",
//       "checklist": [],
//       "users": [
//         {
//           "id": "12",
//           "name": "Meredith Palmer",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/11.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "3",
//       "title": "Develop Mobile App Prototype",
//       "description": "Task: Develop Mobile App Prototype\n\nDescription: In this task, you will lead the development of a mobile app prototype based on the product requirements and design specifications. You will work closely with the UI/UX designers, developers, and product managers to ensure the prototype aligns with the overall product vision.\n\nYour technical expertise and problem-solving skills will be crucial in overcoming challenges and refining the app's functionality and user experience. Regular testing and feedback collection will help us iterate and improve the prototype throughout the development process.\n\nLet's create a user-friendly and visually appealing prototype that sets the stage for an exceptional mobile app!",
//       "dueDate": "2024-02-29T07:43:36.741Z",
//       "completed": false,
//       "stageId": "1",
//       "checklist": [],
//       "users": [
//         {
//           "id": "11",
//           "name": "Creed Bratton",
//           "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/10.jpg"
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     },
//     {
//       "id": "15",
//       "title": "Organize Charity Fundraiser",
//       "description": "Task: Organize Charity Fundraiser\n\nDescription: As the event organizer, you will be leading the efforts to organize a charity fundraiser that supports a meaningful cause. Your project management skills and event planning expertise will help create a successful and impactful event.\n\nCollaboration with the marketing and communication teams will ensure effective promotion and outreach to potential donors and sponsors. The fundraiser is an opportunity for our organization to give back to the community and make a positive impact.\n\nLet's come together to raise funds and support a cause close to our hearts!",
//       "dueDate": "2024-02-29T09:59:34.848Z",
//       "completed": false,
//       "stageId": "4",
//       "checklist": [],
//       "users": [
//         {
//           "id": "1",
//           "name": "Admin User",
//           "avatarUrl": null
//         }
//       ],
//       "comments": {
//         "totalCount": 2
//       }
//     }
//   ],
//   "totalCount": 16
// }

export const KanbanPage: FC<PropsWithChildren> = ({ children }) => {
  const { create, edit, replace } = useNavigation();

  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "stages",
    pagination: {
      mode: "off",
    },
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    queryOptions: {

    }
  });

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
  console.log("thanh", id)
  const { data: tasks, isLoading: isLoadingTasks } = useList<Task>({
    resource: "steps",
    // sorters: [
    //   {
    //     field: "dueDate",
    //     order: "asc",
    //   },
    // ],
    filters: [
      {
        field: "scenarioId",
        operator: "eq",
        value: id,
      },
    ],
    queryOptions: {
      enabled: true,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      // gqlQuery: KANBAN_TASKS_QUERY,
    },
  });
  const initTasks = tasks?.data.filter((task: any) => !task.prevStepId) || []
  // const stages = {
  //   data: initTasks.map((item: any, index: number) => ({
  //     id: item.id,
  //     title: `Stage ${index + 1}`
  //   }))
  // }


  // its convert Task[] to TaskStage[] (group by stage) for kanban
  // uses `stages` and `tasks` from useList hooks
  // const taskStages = useMemo(() => {
  //     if (!tasks?.data || !stages?.data)
  //         return {
  //             unassignedStage: [],
  //             stages: [],
  //         };

  //     const unassignedStage = tasks.data.filter(
  //         (task) => task.stageId === null,
  //     );

  //     // prepare unassigned stage
  //     const grouped = stages.data.map((stage) => ({
  //         ...stage,
  //         tasks: tasks.data.filter(
  //             (task) => task.stageId?.toString() === stage.id,
  //         ),
  //     }));

  //     return {
  //         unassignedStage,
  //         stages: grouped,
  //     };
  // }, [tasks, stages]);

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

  const handleAddStage = () => {
    create("stepStages", "replace");
  };

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

  const getContextMenuItems = (column: any) => {
    const hasItems = column.tasks.length > 0;

    const items: MenuProps["items"] = [
      {
        label: "Edit status",
        key: "1",
        icon: <EditOutlined />,
        onClick: () => handleEditStage({ stageId: column.id }),
      },
      {
        label: "Clear all cards",
        key: "2",
        icon: <ClearOutlined />,
        disabled: !hasItems,
        onClick: () =>
          handleClearCards({
            taskIds: column.tasks.map((task: any) => task.id),
          }),
      },
      {
        danger: true,
        label: "Delete status",
        key: "3",
        icon: <DeleteOutlined />,
        disabled: hasItems,
        onClick: () => handleDeleteStage({ stageId: column.id }),
      },
    ];

    return items;
  };



  const taskStages = useMemo(() => {
    if (!tasks?.data || !stages?.data)
      return {
        unassignedStage: [],
        stages: [],
      };

    const unassignedStage = tasks.data.filter(
      (task) => task.stageId === null,
    );

    // prepare unassigned stage
    const grouped = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter(
        (task) => task.stageId?.toString() === stage.id,
      ),
    }));

    return {
      unassignedStage,
      stages: grouped,
    };
  }, [tasks, stages]);

  const isLoading = false //isLoadingTasks || isLoadingStages;

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoard onDragEnd={handleOnDragEnd}>
        {/* <KanbanColumn
          id={"unassigned"}
          title={"unassigned"}
          count={taskStages?.unassignedStage?.length || 0}
          onAddClick={() => handleAddCard({ stageId: "unassigned" })}
        >
          {taskStages.unassignedStage?.map((task) => {
            return (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: "unassigned" }}
              >
                <ProjectCardMemo {...task} />
              </KanbanItem>
            );
          })}
          {!taskStages.unassignedStage?.length && (
            <KanbanAddCardButton
              onClick={() =>
                handleAddCard({ stageId: "unassigned" })
              }
            />
          )}
        </KanbanColumn> */}
        {taskStages.stages?.map((column) => {
          const contextMenuItems = getContextMenuItems(column);

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              contextMenuItems={contextMenuItems}
              onAddClick={() =>
                handleAddCard({ stageId: column.id })
              }
            >
              {isLoading && <ProjectCardSkeleton />}
              {!isLoading &&
                column.tasks.map((task) => {
                  return (
                    <KanbanItem
                      key={task.id}
                      id={task.id}
                      data={{
                        ...task,
                        stageId: column.id,
                      }}
                    >
                      <ProjectCardMemo {...task} />
                    </KanbanItem>
                  );
                })}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() =>
                    handleAddCard({ stageId: column.id })
                  }
                />
              )}
            </KanbanColumn>
          );
        })}
        <KanbanAddStageButton onClick={handleAddStage} />
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
