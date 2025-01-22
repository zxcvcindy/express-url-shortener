import express from "express";
import UrlsModel from "../models/urls.js";
import db from "../database/connection.js";
import { urls } from "../database/schema.js";
import Response from "../response.js";

const router = express.Router();
const urlsModel = new UrlsModel(db, urls); //初始化model

router.post("/urls/", async (req, res) => {
	//建立url
	const { origin } = req.body;
	const url = await urlsModel.create(origin);
	res.status(201).json(
		new Response({
			//回傳給user
			msg: "created",
			data: url,
		}),
	);
});

router.get("/:short", async (req, res) => {
	//短網址跳轉
	const short = req.params.short; // "/:"後面接什麼，params.後面就接什麼"
	const url = await urlsModel.getOriginFromShort(short);
	res.redirect(url.origin);
});

export default router;
