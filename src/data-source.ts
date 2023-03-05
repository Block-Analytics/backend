import config from "config";
import SurrealDB from "surrealdb.js";

const surrealClient = async () => {
    const user:string = config.get("surrealDb.user")
    const pass:string = config.get("surrealDb.password")

    const db = new SurrealDB(`http://${config.get("surrealDb.hostname")}:${config.get("surrealDb.port")}/rpc`)

    await db.signin({
        user: user,
        pass: pass
    })
    
    await db.use(config.get("surrealDb.ns"), config.get("surrealDb.db"))

    return db
}

export {
    surrealClient
}