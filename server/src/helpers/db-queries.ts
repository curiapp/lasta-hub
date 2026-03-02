import { db } from "@/db";
import { phaseSteps, programmePhases, programmePhaseSteps, users, notifications, notificationRecipients, programmes } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";

async function getStep(programmeId: string, slug: string) {
  return db
    .select({ extraData: programmePhaseSteps.extraData })
    .from(programmePhaseSteps)
    .innerJoin(programmePhases, eq(programmePhaseSteps.programmePhaseId, programmePhases.id))
    .innerJoin(phaseSteps, eq(programmePhaseSteps.phaseStepId, phaseSteps.id))
    .where(and(eq(programmePhases.programmeId, programmeId), eq(phaseSteps.slug, slug)));
}


async function createNotification(
  params: {
    role: string;
    title: string;
    message: string;
    type?: string;
    referenceId?: string;
  }
) {

  const { role, title, message, type, referenceId } = params;

  const [notification] = await db
    .insert(notifications)
    .values({
      title,
      message,
      type,
      referenceId,
    })
    .returning({ id: notifications.id });

  const roleUsers = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, role));

  if (!roleUsers.length) return;

  await db.insert(notificationRecipients).values(
    roleUsers.map((user) => ({
      notificationId: notification.id,
      recipientId: user.id,
    }))
  );

}

async function getUserNotifications(userId: string) {
  return db
    .select({
      id: notifications.id,
      title: notifications.title,
      message: notifications.message,
      type: notifications.type,
      createdAt: notifications.createdAt,
      referenceId: notifications.referenceId,
      isRead: notificationRecipients.isRead,
      programmeName: programmes.title
    })
    .from(notificationRecipients)
    .innerJoin(
      notifications,
      eq(notificationRecipients.notificationId, notifications.id)
    )
    .leftJoin(
      programmes,
      eq(notifications.referenceId, programmes.id)
    )
    .where(eq(notificationRecipients.recipientId, userId))
    .orderBy(desc(notifications.createdAt));
}

async function markNotificationAsRead(
  notificationId: string,
  userId: string
) {
  await db
    .update(notificationRecipients)
    .set({
      isRead: true,
      readAt: new Date().toDateString(),
    })
    .where(
      and(
        eq(notificationRecipients.notificationId, notificationId),
        eq(notificationRecipients.recipientId, userId)
      )
    );
}

async function markAllNotificationsAsRead(
  userId: string
) {
  await db
    .update(notificationRecipients)
    .set({
      isRead: true,
      readAt: new Date().toLocaleTimeString(),
    })
    .where(
      eq(notificationRecipients.recipientId, userId)
    );
}


export { getStep, getUserNotifications, createNotification, markNotificationAsRead, markAllNotificationsAsRead };