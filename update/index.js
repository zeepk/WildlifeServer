const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// import { Critter } from '@/models/critter';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

const spreadsheetId = '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4';
const fishSheetRange = 'Fish!2:81';
const bugsSheetRange = 'Insects!2:81';
const seaSheetRange = 'Sea Creatures!2:41';
const fossilsSheetRange = 'Fossils!2:74';
const artSheetRange = 'Art!2:71';
const gyroidsSheetRange = 'Gyroids!2:190';
const songsSheetRange = 'Music!2:111';

fs.readFile('credentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0],
	);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

function getNewToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err)
				return console.error(
					'Error while trying to retrieve access token',
					err,
				);
			oAuth2Client.setCredentials(token);
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}

function listMajors(auth) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get(
		{
			spreadsheetId,
			range: fishSheetRange,
		},
		(err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const rows = res.data.values;
			if (rows.length) {
				console.log('Id, Name:');

				rows.map((row) => {
					console.log(`${row[0]}, ${row[1]}`);
				});
			} else {
				console.log('No data found.');
			}
		},
	);
}
