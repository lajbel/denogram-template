import { TelegramError } from "./error.ts";
export class Client {
    #token;
    constructor(token) {
        this.#token = token;
    }
    async method(name, payload) {
        const res = await fetch(`https://api.telegram.org/bot${this.#token}/${name}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                connection: "keep-alive",
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.ok) {
            throw new TelegramError(data.error_code, data.description);
        }
        return data.result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHM0MsTUFBTSxPQUFPLE1BQU07SUFDUixNQUFNLENBQVM7SUFFeEIsWUFBWSxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFHRCxLQUFLLENBQUMsTUFBTSxDQUNWLElBQVksRUFDWixPQUFnQjtRQUdoQixNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FDckIsK0JBQStCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLEVBQ3BEO1lBQ0UsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsVUFBVSxFQUFFLFlBQVk7YUFDekI7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7U0FDOUIsQ0FDRixDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWixNQUFNLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Q0FDRiJ9