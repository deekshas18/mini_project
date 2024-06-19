const User = require('../models/userSchema')

module.exports.register = async(req, res)=>{
    try{
        const {username, password} = req.body;

        const newUser = new User({ username, password, });
        await newUser.save();
        res.status(201).json(newUser);
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};