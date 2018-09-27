import mongoose from 'mongoose'

const options = {
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

var conn=null
const connectdb = () => {
    
    if (!conn) {
        var conn = mongoose.connect( 'mongodb://127.0.0.1:27017/hplan1', options )
        conn.then(() => {
                console.log('数据库打开成功')
            }, error => {
                console.error(error)
            })
    }
    return conn
}

export default connectdb
