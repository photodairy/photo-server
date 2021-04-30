const userCls = require('./user-controller');
const VerNumModel = require('../model/ver-number-model');
const UserModel = require('../model/user-model');


class VerNumberCls {
    // Send verfication number
    async sendVerNumber(ctx) {
        ctx.verifyParams({
            phoneNumber: 'number',
        });
        const verNum = Math.round(Math.random() * 100000);
        const verNumber = 888888;
        const { phoneNumber } = ctx.request.body;
        let item = await VerNumModel.findOne({ phoneNumber });
        if (item) {
            await VerNumModel.updateOne({ phoneNumber }, { verNumber })
            ctx.body = "Send Success! Update. PhoneNumber:" + phoneNumber;
        } else {
            await VerNumModel.create({ phoneNumber, verNumber })
            ctx.body = "Send Success! Create. PhoneNumber:" + phoneNumber;
        }
    }

    // Check verfication number
    async checkVerNumber(ctx) {
        ctx.verifyParams({
            phoneNumber: 'number',
            verNumber: 'number'
        });
        const result = await VerNumModel.findOne(ctx.request.body);
        if (result) {
            await userCls.registeredOrLogin(ctx);
        } else {
            ctx.body = 'Error verfication number';
        }
    }
}

module.exports = new VerNumberCls();