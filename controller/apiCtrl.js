const TrendingOption = require("../models/trendingModel");
const Ads = require("../models/ads");
const axios = require('axios');
const path = require("path");
const multer = require("multer");

const Addtoken = async (req, res) => {
    let Option = new TrendingOption({
        ...req.body.tokenData
    });
    await Option.save();
    res.json('success');
}

const GetData = (req, res) => {
    TrendingOption.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err)
        });
}

const Removetoken = (req, res) => {
    TrendingOption.deleteOne({ _id: req.body.id })
        .then(result => {
            if (result) {
                TrendingOption.find()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
        .catch(err => {
            res.json(err)
        })
}

const GetPrice = async (req, res) => {

    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD', {
                headers: {
                    'X-CMC_PRO_API_KEY': '7a932787-01b6-4092-82d2-71fb96ec7a12',
                },
            });
        } catch (ex) {
            response = null;
            console.log(ex);
            reject(ex);
        }
        if (response.data) {
            res.json(response.data)
        }
    });
}

const GetToken = async (req, res) => {
    const api = `https://api.dex.guru/v2/tokens/search/${req.body.value}?network=${req.body.network}`;
    await axios.get(api)
        .then(result => {
            res.send(result.data)
        })
        .catch((err) => {
            res.send(err)
        })
}

const GetOptionlist = async (req, res) => {
    await TrendingOption.find({ network: req.body.network })
        .then(result => {
            if (result) {
                res.send(result)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

const getChartData = async (req, res) => {
    const api = `https://api.dex.guru/v1/tradingview/history?symbol=${req.body.address}-${req.body.network}_USD&resolution=60&from=${req.body.from}&to=${req.body.to}&countback=320`;
    await axios.get(api)
        .then(result => {
            res.send(result.data)
        })
        .catch((err) => {
            res.send(err)
        })
}

const getTradingHistory = async (req, res) => {
    const api = `https://io3.dexscreener.io/u/search/pairs?q=${req.body.address}`
    console.log(api, 'api')
    await axios.get(api)
        .then(result => {
            const History = `https://io12.dexscreener.io/u/trading-history/recent/${result.data.pairs[0].platformId}/${result.data.pairs[0].pairAddress}`;
            console.log(History, 'History-----')
            axios.get(History)
                .then(result => {
                    console.log(result.data, 'result.data---')
                    res.send(result.data);
                })
                .catch(err => {
                    console.log(err, 'err---')
                })
        })
        .catch((err) => {
            console.log(err, 'errapi')
            res.send(err)
        })
}

const UploadAds = async (req, res) => {
    Ads.findOne({ network: req.body.network })
        .then(result => {
            if (result === null) {
                let Option = new Ads({ network: req.body.network, file1: req.images.file1, file2: req.images.file2, file3: req.images.file3 });
                Option.save()
                    .then(result => {
                        res.send({
                            flag: 'create',
                            file1: req.images.file1,
                            file2: req.images.file2,
                            file3: req.images.file3
                        })
                    })
            } else {
                console.log(req.images)
                Ads.updateOne({ network: req.body.network }, { file1: req.images.file1, file2: req.images.file2, file3: req.images.file3 })
                    .then(result => {
                        res.send({
                            flag: 'update',
                            file1: req.images.file1,
                            file2: req.images.file2,
                            file3: req.images.file3
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

const imageMulti = (req, res, next) => {
    let d = req.files
    let row = {}
    for (let i in d) {
        row[d[i].fieldname] = d[i].filename
    }
    req.images = row
    next()
}

const getAds = async (req, res) => {
    Ads.find({ network: req.body.network })
        .then(result => {
            if (result) {
                res.send(result)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

//---------------------------------------

module.exports = {
    Addtoken,
    GetData,
    Removetoken,
    GetPrice,
    GetToken,
    GetOptionlist,
    getChartData,
    getTradingHistory,
    UploadAds,
    imageMulti,
    getAds
};