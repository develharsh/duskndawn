import mongoose from 'mongoose'

function initDB() {
    if (mongoose.connections[0].readyState) {
        //console.log('Already connected.')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err){}
            //console.log(err)
        else {}//console.log('Connected to mongodb.')
    })
}

export default initDB