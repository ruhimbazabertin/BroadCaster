import express from 'express';
import userRoute from './router/userRouter';

const app = express();
app.use(express.json());
app.use(userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));

export default app;
