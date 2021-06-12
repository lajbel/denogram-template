import { commands } from '../mod.ts';

export default (bot: any, ctx: any) => {
    if (ctx.message.text.startsWith("/")) {
        const args: string[] = ctx.message.text.slice(1).split(/ +/);
        const command: any = args.shift()?.toString().toLowerCase();

        const cmd: any = commands.get(command);

        if(cmd) cmd.run(bot, ctx, args)
    }
};
