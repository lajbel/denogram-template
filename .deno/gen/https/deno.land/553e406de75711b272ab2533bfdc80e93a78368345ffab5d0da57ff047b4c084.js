const updateTypes = [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "inline_query",
    "chosen_inline_result",
    "callback_query",
    "shipping_query",
    "pre_checkout_query",
    "poll",
    "poll_answer",
];
const messageSubTypes = [
    "text",
    "animation",
    "audio",
    "document",
    "photo",
    "sticker",
    "video",
    "video_note",
    "voice",
    "contact",
    "dice",
    "game",
    "poll",
    "venue",
    "location",
    "new_chat_members",
    "left_chat_member",
    "new_chat_title",
    "new_chat_photo",
    "delete_chat_photo",
    "group_chat_created",
    "supergroup_chat_created",
    "channel_chat_created",
    "migrate_to_chat_id",
    "migrate_from_chat_id",
    "pinned_message",
    "invoice",
    "successful_payment",
    "connected_website",
    "passport_data",
    "forward_date",
];
export class Context {
    #me;
    #state;
    #update;
    #telegram;
    #updateType;
    #updateSubTypes;
    constructor(update, telegram) {
        this.#update = update;
        this.#telegram = telegram;
        this.#updateType = updateTypes.find((key) => key in this.#update);
        if (this.#updateType === "message" || this.#updateType === "channel_post") {
            this.#updateSubTypes = messageSubTypes
                .filter((key) => key in this.#update[this.#updateType]);
        }
        else {
            this.#updateSubTypes = [];
        }
    }
    get update() {
        return this.#update;
    }
    get telegram() {
        return this.#telegram;
    }
    get updateType() {
        return this.#updateType;
    }
    get updateSubTypes() {
        return this.#updateSubTypes;
    }
    get me() {
        return this.#me;
    }
    set me(value) {
        this.#me = value;
    }
    get state() {
        if (this.#state === undefined) {
            this.#state = {};
        }
        return this.#state;
    }
    set state(value) {
        this.#state = { ...value };
    }
    get message() {
        return this.#update.message;
    }
    get editedMessage() {
        return this.#update.edited_message;
    }
    get channelPost() {
        return this.#update.channel_post;
    }
    get editedChannelPost() {
        return this.#update.edited_channel_post;
    }
    get inlineQuery() {
        return this.#update.inline_query;
    }
    get chosenInlineResult() {
        return this.#update.chosen_inline_result;
    }
    get callbackQuery() {
        return this.#update.callback_query;
    }
    get shippingQuery() {
        return this.#update.shipping_query;
    }
    get preCheckoutQuery() {
        return this.#update.pre_checkout_query;
    }
    get poll() {
        return this.#update.poll;
    }
    get pollAnswer() {
        return this.#update.poll_answer;
    }
    get chat() {
        return (this.message && this.message.chat) ||
            (this.editedMessage && this.editedMessage.chat) ||
            (this.channelPost && this.channelPost.chat) ||
            (this.editedChannelPost && this.editedChannelPost.chat) ||
            (this.callbackQuery && this.callbackQuery.message &&
                this.callbackQuery.message.chat);
    }
    get from() {
        return (this.message && this.message.from) ||
            (this.editedMessage && this.editedMessage.from) ||
            (this.channelPost && this.channelPost.from) ||
            (this.editedChannelPost && this.editedChannelPost.from) ||
            (this.inlineQuery && this.inlineQuery.from) ||
            (this.chosenInlineResult && this.chosenInlineResult.from) ||
            (this.callbackQuery && this.callbackQuery.from) ||
            (this.shippingQuery && this.shippingQuery.from) ||
            (this.preCheckoutQuery && this.preCheckoutQuery.from);
    }
    reply(text, options) {
        if (this.message !== undefined && this.chat !== undefined) {
            return this.#telegram.sendMessage({
                chat_id: this.chat.id,
                text,
                reply_to_message_id: this.message.message_id,
                ...options,
            });
        }
    }
    replyWithMarkdownV2(markdown, options) {
        return this.reply(markdown, {
            parse_mode: "MarkdownV2",
            ...options,
        });
    }
    replyWithHTML(html, options) {
        return this.reply(html, {
            parse_mode: "HTML",
            ...options,
        });
    }
    replyWithMarkdown(markdown, options) {
        return this.reply(markdown, {
            parse_mode: "Markdown",
            ...options,
        });
    }
    forwardMessage(chatId, options) {
        if (this.chat !== undefined) {
            return this.#telegram.forwardMessage({
                chat_id: chatId,
                from_chat_id: this.chat.id,
                ...options,
            });
        }
    }
    getChat() {
        if (this.chat !== undefined) {
            return this.#telegram.getChat(this.chat.id);
        }
    }
    answerCallbackQuery(options) {
        if (this.callbackQuery !== undefined) {
            return this.#telegram.answerCallbackQuery({
                callback_query_id: this.callbackQuery.id,
                ...options,
            });
        }
    }
    setMyCommands(commands) {
        return this.#telegram.setMyCommands(commands);
    }
    getMyCommands() {
        return this.#telegram.getMyCommands();
    }
    deleteMessage() {
        if (this.message !== undefined && this.chat !== undefined) {
            return this.#telegram.deleteMessage(this.chat.id, this.message.message_id);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENBLE1BQU0sV0FBVyxHQUFpQjtJQUNoQyxTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixNQUFNO0lBQ04sYUFBYTtDQUNkLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBcUI7SUFDeEMsTUFBTTtJQUNOLFdBQVc7SUFDWCxPQUFPO0lBQ1AsVUFBVTtJQUNWLE9BQU87SUFDUCxTQUFTO0lBQ1QsT0FBTztJQUNQLFlBQVk7SUFDWixPQUFPO0lBQ1AsU0FBUztJQUNULE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87SUFDUCxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1Qsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsY0FBYztDQUNmLENBQUM7QUFFRixNQUFNLE9BQU8sT0FBTztJQUNsQixHQUFHLENBQVE7SUFDWCxNQUFNLENBQUs7SUFFRixPQUFPLENBQVM7SUFDaEIsU0FBUyxDQUFXO0lBRXBCLFdBQVcsQ0FBYTtJQUN4QixlQUFlLENBQW1CO0lBRTNDLFlBQVksTUFBYyxFQUFFLFFBQWtCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxD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