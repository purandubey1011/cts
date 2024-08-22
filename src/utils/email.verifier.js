const EmailVerifier = require('email-verifier-node');

// Initialize the verifier
const verifier = new EmailVerifier({});

exports.verifyEmail =async(email,next)=> {
    try {
        // Verify the email address
        const result = await verifier.verify(email);
        console.log("email checker :" , result)
        // Check the result
        if (result.isValid) {
            throw new ErorrHandler(`The email ${email} valid.`, 200);
            console.log(`The email ${email} valid.`)
            next()
        }else {
            throw new ErorrHandler(`The email ${email} is valid.`, 400);
            console.log(`The email ${email} is not valid.`);
            console.log('Reason:', result.reason);
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        throw new ErorrHandler(`The email ${email} is valid.`, 400);
    }
}

