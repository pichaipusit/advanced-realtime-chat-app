import { MutationCtx, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export async function requireAuthenticated(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated");
  }
  return identity;
}

export async function requireMessageOwner(
  ctx: MutationCtx | QueryCtx,
  messageId: Id<"messages">
) {
  const identity = await requireAuthenticated(ctx);
  const message = await ctx.db.get(messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  if (message.authorId !== identity.subject) {
    throw new Error("Not authorized");
  }
  return { message, identity };
}
