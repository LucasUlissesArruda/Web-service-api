class InvalidCredentialsException extends Error {
    constructor(message = "Invalid credentials." ){
        super(message);
        this.name = "InvalidCredentialsExcepion";
        this.statusCode = 401;
    }
}

module.exports = InvalidCredentialsException;