import { Composer } from "./composer.ts";
import { Context } from "./context.ts";
import { Telegram } from "./telegram.ts";
import { WebhookServer } from "./webhook_server.ts";
import { Logger } from "./_util/mod.ts";
export class Bot extends Composer {
    #polling = {
        offset: 0,
        limit: 100,
        timeout: 30,
        allowedUpdates: [],
        started: false,
    };
    #webhookServer;
    #telegram;
    #logger = new Logger("INFO: ");
    constructor(token) {
        super();
        this.#telegram = new Telegram(token);
    }
    get telegram() {
        return this.#telegram;
    }
    #handleUpdate = async (update) => {
        this.#logger.print(`Processing update ${update.update_id}`);
        const ctx = new Context(update, this.#telegram);
        ctx.me = await this.#telegram.getMe();
        this.middleware(ctx, async () => { });
    };
    #handleUpdates = (updates) => {
        updates.forEach(this.#handleUpdate.bind(this));
    };
    #fetchUpdates = async () => {
        if (!this.#polling.started) {
            return;
        }
        const updates = await this.#telegram.getUpdates({
            offset: this.#polling.offset,
            limit: this.#polling.limit,
            timeout: this.#polling.timeout,
            allowedUpdates: this.#polling.allowedUpdates,
        });
        this.#handleUpdates(updates);
        if (updates.length > 0) {
            this.#polling.offset = updates[updates.length - 1].update_id + 1;
        }
        this.#fetchUpdates();
    };
    #startPolling = async (options) => {
        if (options !== undefined) {
            this.#polling.offset = options.offset;
            this.#polling.limit = options.limit;
            this.#polling.timeout = options.timeout;
            this.#polling.allowedUpdates = options.allowedUpdates;
        }
        if (!this.#polling.started) {
            this.#polling.started = true;
            this.#fetchUpdates();
        }
    };
    #startWebhook = async (options) => {
        const { domain, path, port, ...rest } = options;
        await this.#telegram.setWebhook({
            url: "https://" + domain + path,
            ...rest,
        });
        this.#webhookServer = new WebhookServer({
            path,
            handler: this.#handleUpdate.bind(this),
        });
        this.#webhookServer.listen(port);
    };
    async launch(options) {
        this.#logger.print("Connecting to Telegram");
        const botInfo = await this.#telegram.getMe();
        this.#logger.print(`Launching ${botInfo.username}`);
        if (options?.webhook === undefined) {
            await this.#telegram.deleteWebhook();
            await this.#startPolling(options?.polling);
            this.#logger.print("Bot started with long polling");
            return;
        }
        await this.#startWebhook(options.webhook);
        this.#logger.print(`Bot started with webhook @ ${options.webhook.domain}`);
    }
    async stop() {
        this.#logger.print("Stopping bot");
        if (this.#webhookServer !== undefined) {
            this.#webhookServer.close();
            return;
        }
        this.#polling.started = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFTLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU9wRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnQnhDLE1BQU0sT0FBTyxHQUFJLFNBQVEsUUFBd0I7SUFDdEMsUUFBUSxHQUFHO1FBQ2xCLE1BQU0sRUFBRSxDQUFDO1FBQ1QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRSxFQUFrQjtRQUNsQyxPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7SUFDRixjQUFjLENBQWlCO0lBRXRCLFNBQVMsQ0FBVztJQUVwQixPQUFPLEdBQVcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEQsWUFBWSxLQUFhO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxhQUFhLEdBQUcsS0FBSyxFQUFFLE1BQXdCLEVBQWlCLEVBQUU7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRTVELE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLEVB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