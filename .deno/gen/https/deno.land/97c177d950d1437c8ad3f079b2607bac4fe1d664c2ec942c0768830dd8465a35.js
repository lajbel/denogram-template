import { encode } from "../encoding/utf8.ts";
import { BufReader, BufWriter } from "../io/bufio.ts";
import { assert } from "../_util/assert.ts";
import { deferred, MuxAsyncIterator } from "../async/mod.ts";
import { bodyReader, chunkedBodyReader, emptyReader, writeResponse, readRequest, } from "./_io.ts";
export class ServerRequest {
    url;
    method;
    proto;
    protoMinor;
    protoMajor;
    headers;
    conn;
    r;
    w;
    done = deferred();
    _contentLength = undefined;
    get contentLength() {
        if (this._contentLength === undefined) {
            const cl = this.headers.get("content-length");
            if (cl) {
                this._contentLength = parseInt(cl);
                if (Number.isNaN(this._contentLength)) {
                    this._contentLength = null;
                }
            }
            else {
                this._contentLength = null;
            }
        }
        return this._contentLength;
    }
    _body = null;
    get body() {
        if (!this._body) {
            if (this.contentLength != null) {
                this._body = bodyReader(this.contentLength, this.r);
            }
            else {
                const transferEncoding = this.headers.get("transfer-encoding");
                if (transferEncoding != null) {
                    const parts = transferEncoding
                        .split(",")
                        .map((e) => e.trim().toLowerCase());
                    assert(parts.includes("chunked"), 'transfer-encoding must include "chunked" if content-length is not set');
                    this._body = chunkedBodyReader(this.headers, this.r);
                }
                else {
                    this._body = emptyReader();
                }
            }
        }
        return this._body;
    }
    async respond(r) {
        let err;
        try {
            await writeResponse(this.w, r);
        }
        catch (e) {
            try {
                this.conn.close();
            }
            catch {
            }
            err = e;
        }
        this.done.resolve(err);
        if (err) {
            throw err;
        }
    }
    finalized = false;
    async finalize() {
        if (this.finalized)
            return;
        const body = this.body;
        const buf = new Uint8Array(1024);
        while ((await body.read(buf)) !== null) {
        }
        this.finalized = true;
    }
}
export class Server {
    listener;
    closing = false;
    connections = [];
    constructor(listener) {
        this.listener = listener;
    }
    close() {
        this.closing = true;
        this.listener.close();
        for (const conn of this.connections) {
            try {
                conn.close();
            }
            catch (e) {
                if (!(e instanceof Deno.errors.BadResource)) {
                    throw e;
                }
            }
        }
    }
    async *iterateHttpRequests(conn) {
        const reader = new BufReader(conn);
        const writer = new BufWriter(conn);
        while (!this.closing) {
            let request;
            try {
                request = await readRequest(conn, reader);
            }
            catch (error) {
                if (error instanceof Deno.errors.InvalidData ||
                    error instanceof Deno.errors.UnexpectedEof) {
                    await writeResponse(writer, {
                        status: 400,
                        body: encode(`${error.message}\r\n\r\n`),
                    });
                }
                break;
            }
            if (request === null) {
                break;
            }
            request.w = writer;
            yield request;
            const responseError = await request.done;
            if (responseError) {
                this.untrackConnection(request.conn);
                return;
            }
            await request.finalize();
        }
        this.untrackConnection(conn);
        try {
            conn.close();
        }
        catch (e) {
        }
    }
    trackConnection(conn) {
        this.connections.push(conn);
    }
    untrackConnection(conn) {
        const index = this.connections.indexOf(conn);
        if (index !== -1) {
            this.connections.splice(index, 1);
        }
    }
    async *acceptConnAndIterateHttpRequests(mux) {
        if (this.closing)
            return;
        let conn;
        try {
            conn = await this.listener.accept();
        }
        catch (error) {
            if (error instanceof Deno.errors.BadResource ||
                error instanceof Deno.errors.InvalidData ||
                error instanceof Deno.errors.UnexpectedEof) {
                return mux.add(this.acceptConnAndIterateHttpRequests(mux));
            }
            throw error;
        }
        this.trackConnection(conn);
        mux.add(this.acceptConnAndIterateHttpRequests(mux));
        yield* this.iterateHttpRequests(conn);
    }
    [Symbol.asyncIterator]() {
        const mux = new MuxAsyncIterator();
        mux.add(this.acceptConnAndIterateHttpRequests(mux));
        return mux.iterate();
    }
}
export function _parseAddrFromStr(addr) {
    let url;
    try {
        url = new URL(`http://${addr}`);
    }
    catch {
        throw new TypeError("Invalid address.");
    }
    if (url.username ||
        url.password ||
        url.pathname != "/" ||
        url.search ||
        url.hash) {
        throw new TypeError("Invalid address.");
    }
    return { hostname: url.hostname, port: Number(url.port) };
}
export function serve(addr) {
    if (typeof addr === "string") {
        addr = _parseAddrFromStr(addr);
    }
    const listener = Deno.listen(addr);
    return new Server(listener);
}
export async function listenAndServe(addr, handler) {
    const server = serve(addr);
    for await (const request of server) {
        handler(request);
    }
}
export function serveTLS(options) {
    const tlsOptions = {
        ...options,
        transport: "tcp",
    };
    const listener = Deno.listenTls(tlsOptions);
    return new Server(listener);
}
export async function listenAndServeTLS(options, handler) {
    const server = serveTLS(options);
    for await (const request of server) {
        handler(request);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFZLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUNMLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGFBQWEsRUFDYixXQUFXLEdBQ1osTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxPQUFPLGFBQWE7SUFDeEIsR0FBRyxDQUFVO0lBQ2IsTUFBTSxDQUFVO0lBQ2hCLEtBQUssQ0FBVTtJQUNmLFVBQVUsQ0FBVTtJQUNwQixVQUFVLENBQVU7SUFDcEIsT0FBTyxDQUFXO0lBQ2xCLElBQUksQ0FBYTtJQUNqQixDQUFDLENBQWE7SUFDZCxDQUFDLENBQWE7SUFDZCxJQUFJLEdBQWdDLFFBQVEsRUFBRSxDQUFDO0lBRXZDLGNBQWMsR0FBOEIsU0FBUyxDQUFDO0lBSzlELElBQUksYUFBYTtRQUdmLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDckMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QyxJQUFJLEVBQUUsRUFBRTtnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFbkMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQzVCO2FBQ0Y7aUJBQU07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