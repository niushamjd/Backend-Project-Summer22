import express from "express";
export default interface IRouterbase {
    router: express.Router;
    routes(): void;
}