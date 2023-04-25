import jwt from 'jsonwebtoken';
// Middleware is used to authorize each actions

//wants to like a post
// click the like button => authMiddleware() => like controller

// creating an auth
const auth = async(req,res,next) => {
    try {

        // We will first find the token length
        const token =req.headers.authorization.split(" ")[1];

        // Here we implement a check whether we have signed using Google-SignIn or custom SignUp-SignIn
        const isCustomAuth = token.length <500;
        // if token length is less than 500 then it is our generated token

        

        // Everytime we call the auth we need to get the data of the user back
        // It is stored in encoded format so we need to decode it back
        let decodedData;


        // If our token is produced and we have customarily authenticated the user
        if(token && isCustomAuth){
            //here we take the token of the user that will contain the email and id of the user
            decodedData = jwt.verify(token,'test');

            req.userId = decodedData?.id;
        }
        else{  //google auth token do not need test

            // Google Auth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is variable in google auth that differentiates each user

        }
        
        // Go to the next called funtion 
        next();

       
    } catch (error) {
        console.log(error);
    }
}

// exporting as a const auth
// we can call auth to check whether a given user is even authorized to do a particular action
// or NOT.
export default auth;