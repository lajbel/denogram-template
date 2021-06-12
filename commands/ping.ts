export default {
    name: "ping",
    description: "Test command",
    run: (bot: any, ctx: any, args: string[]) => {
        ctx.reply("Pong!")
    }
};