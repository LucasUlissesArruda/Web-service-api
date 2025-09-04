// importações de pacotes e middlewares
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

// importações de infraestrutura
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('./Infrastructure/Providers/JWTProvider');
const authRoutes = require('./Infrastructure/Express/routes/auth.routes');

// importações de casos de uso
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUsers');

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// injeção de dependências
// repositórios
const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();

// provedores
const jwtProvider = new JWTProvider();

// use cases
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);

// rotas da API
app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase));

// configuração do Swagger
try {
  const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yml', 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Failed to load swagger.yml file:', e);
}

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;