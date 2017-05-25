const config = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: '...',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

module.exports = config;