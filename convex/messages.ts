import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .order("asc")
      .take(50);

    return messages;
  },
});

export const sendMessage = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("messages", {
      content: args.content,
      authorId: identity.subject,
      isPinned: false,
      reactions: [],
      isEdited: false,
    });
  },
});

export const editMessage = mutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error("Message not found");
    if (message.authorId !== identity.subject)
      throw new Error("Not authorized");

    await ctx.db.patch(args.messageId, {
      content: args.content,
      isEdited: true,
      editedAt: Date.now(),
    });
  },
});

// export const remove = mutation({
//   args: {
//     messageId: v.id("messages"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Not authenticated");

//     const message = await ctx.db.get(args.messageId);
//     if (!message) throw new Error("Message not found");
//     if (message.authorId !== userId) throw new Error("Not authorized");

//     await ctx.db.patch(args.messageId, {
//       deletedAt: Date.now(),
//     });
//   },
// });

// export const togglePin = mutation({
//   args: {
//     messageId: v.id("messages"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Not authenticated");

//     const message = await ctx.db.get(args.messageId);
//     if (!message) throw new Error("Message not found");

//     await ctx.db.patch(args.messageId, {
//       isPinned: !message.isPinned,
//     });
//   },
// });

// export const react = mutation({
//   args: {
//     messageId: v.id("messages"),
//     emoji: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Not authenticated");

//     const message = await ctx.db.get(args.messageId);
//     if (!message) throw new Error("Message not found");

//     const existingReactionIndex = message.reactions.findIndex(
//       (r) => r.userId === userId
//     );

//     let reactions = [...message.reactions];
//     if (existingReactionIndex !== -1) {
//       if (reactions[existingReactionIndex].emoji === args.emoji) {
//         // Remove reaction if same emoji
//         reactions.splice(existingReactionIndex, 1);
//       } else {
//         // Update reaction if different emoji
//         reactions[existingReactionIndex] = { userId, emoji: args.emoji };
//       }
//     } else {
//       // Add new reaction
//       reactions.push({ userId, emoji: args.emoji });
//     }

//     await ctx.db.patch(args.messageId, { reactions });
//   },
// });
