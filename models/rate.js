var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rateSchema = new Schema({
    binance:String,
    Okex:String,
    Bybit:String,
    FTX:String,
    Huobi:String,
    Gate:String,
    Bitget:String,
    frstDate:{type:Date,default:Date.now}

})


module.exports = mongoose.model('rate',rateSchema)