require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { critterRouter } from '@/routes/critters';
import { updateRouter } from '@/routes/update';
import { caughtRouter } from '@/routes/caught';
const connectionString = process.env.MONGO_DB_CONN_STRING;

const app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// config express-session
var sess = {
	secret: 'secret',
	cookie: {
		secure: false,
	},
	resave: false,
	saveUninitialized: true,
};

if (app.get('env') === 'production') {
	// Use secure cookies in production (requires SSL/TLS)
	sess.cookie.secure = true;

	// Uncomment the line below if your application is behind a proxy (like on Heroku)
	// or if you're encountering the error message:
	// "Unable to verify authorization request state"
	// app.set('trust proxy', 1);
}

app.use(session(sess));
// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL:
			process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
	},
	function (
		accessToken: any,
		refreshToken: any,
		extraParams: any,
		profile: any,
		done: any
	) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	}
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
// You can use this section to keep a smaller payload
passport.serializeUser(function (user: any, done: any) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
	done(null, user);
});
var userInViews = require('@/lib/middleware/userInViews');
var authRouter = require('@/routes/auth');
var indexRouter = require('@/routes/index');
var usersRouter = require('@/routes/users');

// ..
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use(json());
app.use(critterRouter);
app.use(updateRouter);
app.use(caughtRouter);
if (connectionString) {
	mongoose.connect(connectionString);
}

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
