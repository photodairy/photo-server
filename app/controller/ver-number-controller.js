const userCls = require('./user-controller');

const verNumberList = [];

class VerNumberCls {

    // Send verfication number
    sendVerNumber(ctx) {
        const verNum = Math.round(Math.random() * 100000);
        verNumberList.push({phoneNumber: ctx.body.phoneNumber, verNumber: 888});
    }

    // Check verfication number
    checkVerNumber(ctx) {
        const result = verNumberList.some(item => item.phoneNumber === ctx.body.phoneNum && item.verNumber === ctx.body.verNum);
        if (result) {
            new userCls().registeredOrLogin(ctx);
        } else {
            ctx.throw('401', 'Error verfication number');
        }
    }
}

module.exports = new VerNumberCls();