const VerNumModel = require('../model/ver-number-model');

class VerNumberCls {
    // Send verfication number
    async sendVerNumber(ctx) {
        ctx.verifyParams({
            phoneNumber: 'number',
        });
        const _this = this;
        const verNum = Math.round(Math.random() * 100000);
        const verNumber = 888888;
        const { phoneNumber } = ctx.request.body;
        let item = await VerNumModel.findOne({ phoneNumber });
        if (item) {
            // TODO: Send phone message.
            await VerNumModel.updateOne({ phoneNumber }, { verNumber })
            ctx.body = "Send Success! Update. PhoneNumber:" + phoneNumber;
        } else {
            await VerNumModel.create({ phoneNumber, verNumber })
            ctx.body = "Send Success! Create. PhoneNumber:" + phoneNumber;
        }
    }

    // Check verfication number
    async checkVerNumber(ctx, next) {
        ctx.verifyParams({
            phoneNumber: 'number',
            verNumber: 'number'
        });
        // const result = true;
        const result = await VerNumModel.findOne(ctx.request.body);
        if (result) {
            await next();
        } else {
            ctx.body = 'Error verfication number';
        }
    }
}

module.exports = new VerNumberCls();