import { Client } from "./client.ts";
export class Telegram extends Client {
    getUpdates(parameters) {
        return this.method("getUpdates", { ...parameters });
    }
    setWebhook(parameters) {
        return this.method(`setWebhook`, { ...parameters });
    }
    deleteWebhook() {
        return this.method("deleteWebhook");
    }
    getWebhookInfo() {
        return this.method("getWebhookInfo");
    }
    getMe() {
        return this.method("getMe");
    }
    sendMessage(parameters) {
        return this.method("sendMessage", { ...parameters });
    }
    forwardMessage(parameters) {
        return this.method("forwardMessage", { ...parameters });
    }
    sendPhoto(parameters) {
        return this.method("sendPhoto", { ...parameters });
    }
    kickChatMember(parameters) {
        return this.method("kickChatMember", { ...parameters });
    }
    unbanChatMember(chatId, userId) {
        return this.method("unbanChatMember", { chat_id: chatId, user_id: userId });
    }
    leaveChat(chatId) {
        return this.method("leaveChat", {
            chat_id: chatId,
        });
    }
    getChat(chatId) {
        return this.method("getChat", {
            chat_id: chatId,
        });
    }
    answerCallbackQuery(parameters) {
        return this.method("answerCallbackQuery", { ...parameters });
    }
    setMyCommands(commands) {
        return this.method("setMyCommands", { commands });
    }
    getMyCommands() {
        return this.method("getMyCommands");
    }
    deleteMessage(chatId, messageId) {
        return this.method("deleteMessage", { chat_id: chatId, message_id: messageId });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZWdyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZWxlZ3JhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBa0JyQyxNQUFNLE9BQU8sUUFBUyxTQUFRLE1BQU07SUFFbEMsVUFBVSxDQUFDLFVBQWdDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBVyxZQUFZLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUdELFVBQVUsQ0FBQyxVQUFnQztRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8sWUFBWSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFHRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFPLGVBQWUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFjLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdELEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8sT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUdELFdBQVcsQ0FBQyxVQUFpQztRQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQVUsYUFBYSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFHRCxjQUFjLENBQUMsVUFBb0M7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFVLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFHRCxTQUFTLENBQUMsVUFBK0I7UUFDdkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFVLFdBQVcsRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBR0QsY0FBYyxDQUFDLFVBQW9DO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBR0QsZUFBZSxDQUFDLE1BQXVCLEVBQUUsTUFBYztRQUNyRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQ2hCLGlCQUFpQixFQUNqQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUNyQyxDQUFDO0lBQ0osQ0FBQztJQUdELFNBQVMsQ0FBQyxNQUF1QjtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8sV0FBVyxFQUFFO1lBQ3BDLE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCxPQUFPLENBQUMsTUFBdUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFPLFNBQVMsRUFBRTtZQUNsQyxPQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsbUJBQW1CLENBQUMsVUFBeUM7UUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFPLHFCQUFxQixFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFHRCxhQUFhLENBQUMsUUFBc0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFPLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQWUsZUFBZSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdELGFBQWEsQ0FBQyxNQUFjLEVBQUUsU0FBaUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUNoQixlQUFlLEVBQ2YsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FDM0MsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9