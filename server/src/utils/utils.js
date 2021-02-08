const utils = (function () {
    const fs = require("fs/promises");
    // const easyImage = require("easyimage");
    const md5 = require("md5");
    const path = require("path");
    const assetsRelPath = path.resolve(__dirname, "../../assets/");
    const jwt = require("jsonwebtoken");
    const config = require("../../config");



    const verifyAuthToken = (token) => {
        try {
            const user = jwt.verify(token, config.TOKEN_KEY);
            return user;

        } catch (error) {
            console.log(error);
        }

        return false;
    };

    const generateAuthToken = (user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            userName: user.userName
        },
            config.TOKEN_KEY
        );

        return token;

    };

    const hashPassword = (password) => {


        return md5(password + config.SALT);

    }

    const ucwords = (str) => {
        return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });

    };

    const readProfilePicture = async (id) => {
        var path = `${assetsRelPath}/profile/${id}.jpg`;
        const picture = await fs.readFile(path, { encoding: 'base64' }).
            catch((error) => {
                console.log("Error while reading picture", error);
            });
        return (picture) ? picture : null;

    };

    const saveProfilePicture = async (id, { extension, base64 }) => {
        if (!base64) {
            return false;
        }

        try {
            if (extension === "jpeg") {
                extension = "jpg";
            }
            var path = `${assetsRelPath}/profile/${id}.jpg`
            var picture = await fs.writeFile(path, base64, { encoding: 'base64' });

            // if (extension !== "jpg") {
            //     let newPath = `${assetsRelPath}/profile/${id}.jpg`;
            //     await easyImage.convert({ src: path, dst: newPath });
            // }

            return true;

        } catch (error) {
            console.log("Error while saving picture", error);
        }

        return false;
    }

    return {
        readProfilePicture: readProfilePicture,
        saveProfilePicture: saveProfilePicture,
        ucwords: ucwords,
        hashPassword: hashPassword,
        generateAuthToken: generateAuthToken,
        verifyAuthToken: verifyAuthToken
    }
})();


module.exports = utils;