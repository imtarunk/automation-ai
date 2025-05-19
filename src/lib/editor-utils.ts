import { ConnectionProviderProps } from "@/provider/connections-provider";
import { EditorCanvasCardType } from "./types";
import { EditorState } from "@/provider/editor-provider";
import { getDiscordConnectionUrl } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import {
  getNotionConnection,
  getNotionDatabase,
} from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import {
  getSlackConnection,
  listBotChannels,
} from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { Option } from "@/components/ui/multiple-selector";
import { toast } from "sonner";

export const onDragStart = (
  event: any,
  nodeType: EditorCanvasCardType["type"]
) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export const onSlackContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onDiscordContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onContentChange = (
  nodeConnection: ConnectionProviderProps,
  nodeType: string,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (nodeType === "Slack") {
    onSlackContent(nodeConnection, event);
  } else if (nodeType === "Discord") {
    onDiscordContent(nodeConnection, event);
  } else if (nodeType === "Notion") {
    onNotionContent(nodeConnection, event);
  }
};

export const onAddTemplateSlack = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplateDiscord = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplate = (
  nodeConnection: ConnectionProviderProps,
  title: string,
  template: string
) => {
  if (title === "Slack") {
    onAddTemplateSlack(nodeConnection, template);
  } else if (title === "Discord") {
    onAddTemplateDiscord(nodeConnection, template);
  }
};

export const onConnections = async (
  nodeConnection: ConnectionProviderProps,
  editorState: EditorState,
  googleFile: any
) => {
  if (editorState.editor.selectedNode.data.title == "Discord") {
    const connection = await getDiscordConnectionUrl();
    if (connection) {
      nodeConnection.setDiscordNode({
        webhookURL: connection.url,
        content: "",
        webhookName: connection.name,
        guildName: connection.guildName,
      });
    }
  }
  if (editorState.editor.selectedNode.data.title == "Notion") {
    const connection = await getNotionConnection();
    if (connection) {
      if (!connection.databaseId) {
        toast.error(
          "No Notion database selected. Please connect a Notion database first."
        );
        return;
      }
      nodeConnection.setNotionNode({
        accessToken: connection.accessToken,
        databaseId: connection.databaseId,
        workspaceName: connection.workspaceName,
        content: "",
      });

      try {
        const response = await getNotionDatabase(
          connection.databaseId,
          connection.accessToken
        );
        if (!response) {
          toast.error(
            "Failed to connect to Notion database. Please check your connection."
          );
        }
      } catch (error) {
        toast.error(
          "Failed to connect to Notion database. Please check your connection."
        );
      }
    }
  }
  if (editorState.editor.selectedNode.data.title == "Slack") {
    const connection = await getSlackConnection();
    if (connection) {
      nodeConnection.setSlackNode({
        appId: connection.appId,
        authedUserId: connection.authedUserId,
        authedUserToken: connection.authedUserToken,
        slackAccessToken: connection.slackAccessToken,
        botUserId: connection.botUserId,
        teamId: connection.teamId,
        teamName: connection.teamName,
        userId: connection.userId,
        content: "",
      });
    }
  }
};

export const fetchBotSlackChannels = async (
  token: string,
  setSlackChannels: (slackChannels: Option[]) => void
) => {
  await listBotChannels(token)?.then((channels) => setSlackChannels(channels));
};

export const onNotionContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setNotionNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};
