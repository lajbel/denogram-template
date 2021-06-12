// Import libs

import { Bot, Context } from 'https://deno.land/x/telegram@v0.1.1/mod.ts';

// Start bot

const token: string = Deno.env.get('TOKEN')!; // Get Token
const bot: any = new Bot(token); 

export const commands = new Map() // Commands collection for the command handler!

// Command Handler

for await (const dir of Deno.readDir('./commands')) {
    if (dir.name.endsWith('.ts')) {
        import(`./commands/${dir.name}`).then(file => {
            const content: any = file.default;
            const name: string = content.name;

            commands.set(name, content);
        });
    };
};

// Event Handler

for await (const dir of Deno.readDir('./events')) {
    if (dir.name.endsWith('.ts')) {
        import(`./events/${dir.name}`).then(file => {
            const content: any = file.default;
            const name: any = dir.name.substring(0, dir.name.length - 3)

            bot.on(name, content.bind(null, bot));
        });
    };
};

bot.launch(); // Launch Bot 
