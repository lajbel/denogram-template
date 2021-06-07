import { difference, removeEmptyValues } from "./util.ts";
export function parse(rawDotenv) {
    const env = {};
    for (const line of rawDotenv.split("\n")) {
        if (!isVariableStart(line))
            continue;
        const key = line.slice(0, line.indexOf("=")).trim();
        let value = line.slice(line.indexOf("=") + 1).trim();
        if (hasSingleQuotes(value)) {
            value = value.slice(1, -1);
        }
        else if (hasDoubleQuotes(value)) {
            value = value.slice(1, -1);
            value = expandNewlines(value);
        }
        else
            value = value.trim();
        env[key] = value;
    }
    return env;
}
export function config(options = {}) {
    const o = Object.assign({
        path: `.env`,
        export: false,
        safe: false,
        example: `.env.example`,
        allowEmptyValues: false,
        defaults: `.env.defaults`,
    }, options);
    const conf = parseFile(o.path);
    if (o.safe) {
        const confExample = parseFile(o.example);
        assertSafe(conf, confExample, o.allowEmptyValues);
    }
    if (o.defaults) {
        const confDefaults = parseFile(o.defaults);
        for (const key in confDefaults) {
            if (!(key in conf)) {
                conf[key] = confDefaults[key];
            }
        }
    }
    if (o.export) {
        for (const key in conf) {
            if (Deno.env.get(key) !== undefined)
                continue;
            Deno.env.set(key, conf[key]);
        }
    }
    return conf;
}
function parseFile(filepath) {
    try {
        return parse(new TextDecoder("utf-8").decode(Deno.readFileSync(filepath)));
    }
    catch (e) {
        if (e instanceof Deno.errors.NotFound)
            return {};
        throw e;
    }
}
function isVariableStart(str) {
    return /^\s*[a-zA-Z_][a-zA-Z_0-9 ]*\s*=/.test(str);
}
function hasSingleQuotes(str) {
    return /^'([\s\S]*)'$/.test(str);
}
function hasDoubleQuotes(str) {
    return /^"([\s\S]*)"$/.test(str);
}
function expandNewlines(str) {
    return str.replaceAll("\\n", "\n");
}
function assertSafe(conf, confExample, allowEmptyValues) {
    const currentEnv = Deno.env.toObject();
    const confWithEnv = Object.assign({}, currentEnv, conf);
    const missing = difference(Object.keys(confExample), Object.keys(allowEmptyValues ? confWithEnv : removeEmptyValues(confWithEnv)));
    if (missing.length > 0) {
        const errorMessages = [
            `The following variables were defined in the example file but are not present in the environment:\n  ${missing.join(", ")}`,
            `Make sure to add them to your env file.`,
            !allowEmptyValues &&
                `If you expect any of these variables to be empty, you can set the allowEmptyValues option to true.`,
        ];
        throw new MissingEnvVarsError(errorMessages.filter(Boolean).join("\n\n"));
    }
}
export class MissingEnvVarsError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingEnvVarsError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFlMUQsTUFBTSxVQUFVLEtBQUssQ0FBQyxTQUFpQjtJQUNyQyxNQUFNLEdBQUcsR0FBaUIsRUFBRSxDQUFDO0lBRTdCLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUFFLFNBQVM7UUFDckMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7O1lBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FB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