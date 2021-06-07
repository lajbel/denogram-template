// Import libs

import { Bot, Context } from 'https://deno.land/x/telegram@v0.1.1/mod.ts';

// Start bot

const token: string = Deno.env.get('TOKEN')!; // Get Token
const bot: Bot = new Bot(token); 

const commands = new Map() // Commands collection for the command handler!

// Get commands from dir (Command Handler)

for await (const dir of Deno.readDir('./commands')) {
    if (dir.name.endsWith(".ts")) {
        import(`./commands/${dir.name}`).then((file) => {
            const content: any = file;
            const name: string = file.default.name;

            commands.set(name, content);
        })
    };
};


bot.on('message', (ctx: any) => {
    console.log(ctx.message);
});

bot.launch(); // Launch Bot 