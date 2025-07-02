import { Response } from 'express';

const sendToken = (user: any, statusCode: number, res: Response) => {

    //Creating JWT Token
    const token = user.getJwtToken();

    //setting cookies 
    const options = {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRES_TIME!) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none' as const,  // Needed for cross-origin cookie sharing
        secure: true       // Required by browser when using sameSite: 'none'
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        })
}

export default sendToken;