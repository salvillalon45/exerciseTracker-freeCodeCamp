import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './utils';
import { router } from './routes/api';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use the routes
app.use('/api', router);

app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
