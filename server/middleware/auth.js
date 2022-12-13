import jwt from 'jsonwebtoken';

//wants to like a post
// click the like button => authMiddleware() => like controller

const auth = async(req,res,next) => {
    try {
        const token =req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <500;
        // if token length is less than 500 then it is our generated token
        let decodedData;

        if(token && isCustomAuth){
            //here we take the token of the user that will contain the email and id of the user
            decodedData = jwt.verify(token,'test');

            req.userId = decodedData?.id;
        }
        else{  //google auth token do not need test
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is variable in google auth that differentiates each user

        }

       next();
    } catch (error) {
        console.log(error);
        
    }
}

export default auth;