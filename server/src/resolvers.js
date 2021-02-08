const validation = require("./utils/validation");
const utils = require("./utils/utils");
const { Prisma } = require("@prisma/client");
const messageObj = {
    success: false,
    messages: []
};

const resolvers = {
    Query: {
        queryUser: async (paren, args, context, info) => {
            const header = context.req.headers.authorization;
            var logout = false;
            var user = null;
            const prismaClient= context.prismaClient;
            if (header) {
                const token = header.split(" ")[1];
                var tokenInfo = utils.verifyAuthToken(token);
                if (tokenInfo) {
                     user = await prismaClient.user.findUnique({
                        where: {
                            id: tokenInfo.id
                        }
                    }).catch((error) => {
                        console.log(error);
                    });

                    if(user){
                        const base64 =  utils.readProfilePicture(user.id);
                        
                        user = {
                            
                            authInfo: {
                                userName: user.userName
                            },
                            email: user.email,
                            name: user.name, 
                            profilePicture:{
                                base64: base64
                            }
                        }   


                    }
                }else{
                    logout = true;
                }

                return({
                    user: user,
                    logout: logout
                })
            }

            throw new Error("Authentication Token missing");
        }
    },
    Mutation: {
        registerUser: async (parent, args, context, info) => {

            const { registrationInput } = args;
            const { prismaClient } = context;
            const message = { ...messageObj };

            var user = null;

            const errors = await validation.validateUserInput(registrationInput, prismaClient, "registration");
            if (!errors) {

                var newUser = await prismaClient.user.create({
                    data: {
                        userName: registrationInput.userName,
                        email: registrationInput.email,
                        password: utils.hashPassword(registrationInput.password),
                        name: registrationInput.name
                    }
                }).catch((error) => {

                    console.log("Error while saving user in DB:", error);
                });

                if (newUser) {

                    let pictureSaved = await utils.saveProfilePicture(newUser.id, registrationInput.profilePicture);
                    message.success = true;
                    user = {

                        email: newUser.email,
                        name: newUser.name,
                        authInfo: {
                            userName: newUser.userName,
                            token: utils.generateAuthToken(newUser)
                        }
                        
                    }

                }

            } else {
                message.messages = [...errors];

            }

            return {
                user: user,
                message: message

            };
        },
        loginUser: async (parent, args, context, info) => {

            const { loginInput } = args;
            const { prismaClient } = context;
            const message = { ...messageObj };
            var user = null;            

            var errors = await validation.validateUserInput(loginInput, prismaClient, "login");            
            if (!errors) {
                errors =[];
                 user = await prismaClient.user.findUnique({
                    where: {
                        userName: loginInput.userName
                    }
                }).catch((error) => {
                    errors.push("There has been an error. Please contact IT Department");
                    console.log(error);
                });
                console.log(user);
                if (user) {
                    const profilePicture = utils.readProfilePicture(user.id);
                    if (user.password === utils.hashPassword(loginInput.password)) {

                        user = {
                            email: user.email,
                            name: user.name,
                            authInfo: {
                                userName: user.userName,
                                token: utils.generateAuthToken(user)
                            }
                        }

                        message.success = true;

                    }else{
                        errors.push("Invalid User Name / Password");
                    }

                }else{                    
                    if(errors.length === 0){
                        errors.push("Invalid User Name / Password");
                    }
                }

            }

            message.messages = [...errors]

            return {
                user: user,
                message: message

            };
        }


    }
}

module.exports = resolvers;