const AllData = require('../data') || [];
const uuid = require('uuid');
const fs = require('fs');


module.exports = {

    async getAllData(req, res) {
        try {
            const data = await AllData;
            res.render('Data', {
                buttonsEnabled: true,
                AllData: data
            });
        } catch (err) { console.log(err); }
    },


    


    async addDataPost(req, res) {
        if (req.body.name && req.body.phone) {
            await AllData.push({
                id: uuid.v4(),
                name: req.body.name,
                phone: req.body.phone
            })
            await saveToFile();
            res.json(AllData)
        } else {
            res.end('Parameters not found');
        }
    },


    async addDataGet(req, res) {
        let data = [];
        data = await AllData;
        res.render('addData', {
            buttonsEnabled: false,
            AllData: data
        });
    },


    async updateDataPost(req, res) {
        if (req.query.id && req.body.name && req.body.phone) {
            const data = await AllData.find(c => c.id === req.query.id);
            if (data) {
                data.name = req.body.name;
                data.phone = req.body.phone;
            }
            await saveToFile();
            res.json(AllData)
        } else {
            res.end('Parameters not found');
        }
    },


    async updateDataGet(req, res) {
        let data = [], contact;
        data = await AllData;
        dataById = await AllData.find(c => c.id === req.query.id);;
        res.render('updateData', {
            buttonsEnabled: false,
            AllData: data,
            thisData: dataById
        });
    },


    async deleteData(req, res) {
        if (req.query.id) {
            const index = AllData.findIndex(c => c.id === req.query.id);
            if (index !== -1) {
                AllData.splice(index, 1);
            }
            await saveToFile();
            res.json(AllData)
        } else {
            res.end('Parameters not found');
        }
    }
};


const saveToFile = async () => {
    try { await fs.promises.writeFile('./data.json', JSON.stringify(AllData, null, 4)); }
    catch (err) { console.log(err); }
}