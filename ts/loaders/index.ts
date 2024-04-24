import expressLoader from './express'
import express from 'express';
import logger from './logger'

export default async ({expressApp} : { expressApp : express.Application }) => {
    await expressLoader({ app : expressApp});
};