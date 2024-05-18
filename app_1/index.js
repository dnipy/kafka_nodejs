const bodyParser = require('body-parser')
const express = require('express')
const { Kafka } = require('kafkajs')

const app = express()
app.use(express.json())


const kafka = new Kafka({
    clientId : 'app_1',
    brokers : ['localhost:9092']
})
const producer = kafka.producer()


app.post('/text-to-consumers',async(req,res)=>{
    if (!req.body?.msg) return res.json({err : 'no msg found'})


    try {
        const msg = {
            key : String(Math.random()),
            value : JSON.stringify(req.body.msg)
        }
        console.log(msg)
        await producer.send({
            topic : 'events',
            messages : [msg]
        })
        console.log('app-1 = ',msg)
        return res.json({data : 'masage sent',msg})
    }
    catch {
        return res.json({err: 'err while send date'})
    }
})



app.listen(3000,async ()=>{
    producer.connect().then(()=>{
        console.log(`producer is ready on port 3000`)
    })
})