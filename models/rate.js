var mongoose = require('mongoose');
var Schema = mongoose.Schema;


process.env.TZ = 'Asia/Seoul';

const moment = require('moment-timezone');


var rateSchema = new Schema({
    binance:String,
    Okex:String,
    Bybit:String,
    FTX:String,
    Huobi:String,
    Gate:String,
    Bitget:String,
    frstDate:{type:Date,required: true, default: () => moment().add(9,'h')}

})


module.exports = mongoose.model('rate',rateSchema)