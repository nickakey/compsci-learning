import dgram, { Socket } from 'node:dgram';

const server: Socket = dgram.createSocket('udp4');

// A UDP datagram is the fundamental unit of data transmission used by the User Datagram Protocol (UDP). 
// It is a lightweight, "connectionless" packet that prioritizes raw speed and efficiency over error checking or guaranteed delivery.

const store = {};

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
});

const parseMessage = (msg: string): { method: string, key: string, value: string | null } => {
    const [method, key, value] = msg.split(' ');
    if (!method || !key) {
        throw Error('invalid message')
    }
    return { method, key, value }
}

// Messages are operation (GET or SET) <space> key <space> value
server.on('message', (msg, rinfo) => {
    try {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        const { method, key, value } = parseMessage(msg.toLocaleString())

        if (method.toLocaleLowerCase() === "get") {
            const cleanedKey = key.slice(0, key.length - 1)
            const existingValue = store[cleanedKey] ?? 'undefined'
            server.send(existingValue, rinfo.port, 'localhost')
            return
        }
        if (method.toLocaleLowerCase() === "set") {
            if (!value) {
                server.send("invalid or missing value", rinfo.port, 'localhost')
                return
            }
            const cleanedValue = value.slice(0, value.length - 1)
            store[key] = cleanedValue;
            server.send("value set", rinfo.port, 'localhost')
        }
    } catch (err) {
        server.send("uncaught error RIP in pieces", rinfo.port, 'localhost')
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);