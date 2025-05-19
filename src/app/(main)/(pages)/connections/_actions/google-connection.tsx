"use server";
import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { google } from "googleapis";

export const getFileMetaData = async () => {
  "use server";
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  );

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { message: "User not found" };
  }

  const googleAccount = user.externalAccounts.find(
    (account) => account.provider === "oauth_google"
  );

  if (!googleAccount) {
    return { message: "No Google account connected" };
  }

  // Get the OAuth token from the user's metadata
  const session = await auth();
  const oauthToken = await session.getToken({ template: "google" });

  if (!oauthToken) {
    return { message: "No OAuth token found" };
  }

  oauth2Client.setCredentials({
    access_token: oauthToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const response = await drive.files.list();

  if (response) {
    return response.data;
  }
};
