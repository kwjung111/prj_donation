import express from 'express'
import signUpRouter from '../routes/signUpRouter'

export default ({ app }: { app: express.Application }) => {
       
    app.use(express.json())

    app.use('/signUp', signUpRouter);
    
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        next(err);
    });

    //error handler
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            return res
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(500);
        res.json({
            errors: {
                messsage: err.message
            },
        });
    });
}