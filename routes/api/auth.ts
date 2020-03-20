import express from 'express';
import { authenticate, token } from '../../service/apiService';

export const auth: express.Handler = (_req, res, next) => {
    authenticate(_req.body.email)
        .then(user => user ? res.status(200).json(user) : res.status(400).json({ message: 'User Details are invalid' }))
        .catch(err => next(err));
};

export const tokenRefresh: express.Handler = (_req, res, next) => {
    token(_req.body.email, _req.body.refreshToken)
        .then(tokenData => tokenData ? res.status(200).json(tokenData) : res.status(401).json({ message: 'Invalid Token' }))
        .catch(err => next(err));
};
