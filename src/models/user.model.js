const users = [
        {
            id: '1',
            name: "Atul",
            email: "atul@gmail.com",
            password: '12345',
            role: 'recruiter'
        },
        {
            id: '2',
            name: "Ayush",
            email: "ayush@gmail.com",
            password: '12345',
            role: 'recruiter'
        },
        {
            id: '3',
            name: "Ankit",
            email: "ankit@gmail.com",
            password: '12345',
            role: 'seeker'
        }
    ]    

export default class UserModel {
    // get all users
    static getUsers() {
        return users;
    }
    // add a new user to users list
    static addUser(user) {
        user.id = crypto.randomUUID();
        users.push(user);
    }
    // Find a user by email
    static findUserByEmail(email){
        return users.find(user => user.email === email);
    }
    // Check if a user exists by email and password
    static userExists(email, password) {
        return users.some(user => user.email === email && user.password === password);
    }
}