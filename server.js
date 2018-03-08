import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import cors from 'koa-cors'
import convert from 'koa-convert'
import mongoose from 'mongoose'
import configs from './configs/mongodb.config'

const app = new koa()
const router = new koaRouter()
const db = mongoose.createConnection(['mongodb://', configs.mongodb.ip, '/', configs.mongodb.dbname].join(''))

if (db) {
    console.log('mongodb connected successfully')
    global.db = db
} else {
    console.log('mongodb connected failed')
}

import schemaRouters from './routers/schema.router'
const schemas = schemaRouters()

router.post('/graphql', koaBody(), graphqlKoa({ schema: schemas.Schema }));
router.get('/graphql', graphqlKoa({ schema: schemas.Schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(convert(cors(configs.cors)))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(configs.port, () => {
    console.log('app started successfully, listening on port ' + configs.port);
});

