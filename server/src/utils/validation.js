const utils = require("./utils");
const validation = (function () {
    const validateUserInput = async (userInput, prismaClient, inputType) => {

        var validator = undefined;
        switch (inputType) {
            case "registration":
                validator = {
                    userName: {
                        fieldName: "User Name",
                        minLength: '4',
                        unique: true,
                    },
                    password: {
                        minLength: 8,
                        match: "confirmPassword",
                        matchFieldName: "Confirm Password"
                    },
                    email: {
                        validEmail: true,
                        unique: true
                    },
                    name: {
                        minLength: 2
                    }

                };
                break;
            case "login":
                validator = {
                    userName: {
                        fieldName: "User Name",
                        minLength: '4',
                    },
                    password: {
                        minLength: 8,
                    }
                };
                break;            
        }        
        const errors = await validateInput(validator, userInput, prismaClient);        
        return errors;

    };

    const validateInput = async (validator, input, prismaClient) => {
        var errors = [];
        var validations = [];
        if (!validator) {
            return false;
        }

        const properties = Object.keys(validator);
        if (properties.length === 0) {
            return false;
        }

        for (var property of properties) {

            if (!input.hasOwnProperty(property)) {                
                continue;
            }
            var validatorProperty = validator[property]
            validations = Object.keys(validatorProperty);
            if (validations.length === 0) {
                continue;
            }

            for (var validationName of validations) {
                let validationValue = validatorProperty[validationName];
                let validationFieldName = (validatorProperty["fieldName"]) ? validatorProperty["fieldName"] : utils.ucwords(property);
                input[property] = input[property].trim();
                let inputValue = input[property];

                switch (validationName) {
                    case "minLength":
                        if (inputValue.length < validationValue) errors.push(`${validationFieldName} does not meet the minimum length requirement: ${validationValue}`);
                        break;
                    case "match":

                        if (input[validationValue]) {
                            let matchValue = input[validationValue];
                            let matchFieldName = validatorProperty.matchFieldName;


                            if (matchValue !== inputValue) errors.push(`${validationFieldName} does not match with : ${matchFieldName}`);
                        }

                        break;
                    case 'validEmail':
                        if (validationValue) {
                            let emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                            if (!inputValue.match(emailRegex)) errors.push(`You need to enter a valid email address`);
                        }

                        break;

                    case 'unique':
                        let where = {};
                        where[property] = inputValue;
                        let user = await prismaClient.user.findUnique({
                            where: {
                                ...where

                            }
                        }).catch((error) => {
                            console.log(error);
                        });

                        if (user) {
                            errors.push(`There's already an user with the specified ${validationFieldName}: ${inputValue}.`);
                        }


                        break;

                }
            }

        };

        errors = (errors.length > 0) ? errors : false;

        return errors;


    }
    return {
        validateUserInput: validateUserInput        

    }
})();
module.exports = validation;


