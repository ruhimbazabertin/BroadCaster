import express from 'express';
import userRoute from './router/userRouter';
import redFlagRoute from './router/redFlagRouter';

const app = express();

app.use(express.json());

app.use(userRoute);
app.use(redFlagRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));

export default app;
