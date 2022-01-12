const transporter = require("../configs/email");

module.exports = function (from,to,subject,text,html,attachments=null){
    transporter.sendMail({
        from,to,subject,text,html,attachments
    })
}

