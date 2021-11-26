import { testUser } from '@/utils/local';
import { isDev } from '@/utils/helperFunctions';

module.exports = function () {
	return function secured(req, res, next) {
		if (isDev()) {
			req.user = testUser;
		}
		if (req.user) {
			return next();
		}
		req.session.returnTo = req.originalUrl;
		res.redirect('/login');
	};
};
