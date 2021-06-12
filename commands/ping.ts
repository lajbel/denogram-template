export default {
    name: "ping",
    run: (bot: any, ctx: any, args: string[]) => {
        ctx.reply("Pong!")
    }
};