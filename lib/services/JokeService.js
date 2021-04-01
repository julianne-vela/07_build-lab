const Joke = require('../models/Joke');
const User = require('../models/User');
const sendAWSEmail = require('../utils/aws-ses');

// Get Joke from API and munge into DB format
module.exports = class JokeService {
    static async create()
}


// Inject into email template and pass to AWS
