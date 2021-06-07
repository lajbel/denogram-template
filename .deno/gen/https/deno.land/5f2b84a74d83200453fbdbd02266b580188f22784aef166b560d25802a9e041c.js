export class TelegramError extends Error {
    #code;
    #description;
    constructor(code, description) {
        super(`telegram: ${code} ${description}`);
        this.#code = code;
        this.#description = description;
    }
    get code() {
        return this.#code;
    }
    get description() {
        return this.#description;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sYUFBYyxTQUFRLEtBQUs7SUFDN0IsS0FBSyxDQUFTO0lBQ2QsWUFBWSxDQUFTO0lBRTlCLFlBQVksSUFBWSxFQUFFLFdBQW1CO1FBQzNDLEtBQUssQ0FBQyxhQUFhLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0NBQ0YifQ==