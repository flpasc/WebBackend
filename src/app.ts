require('dotenv').config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const getRandomNumber = (max: number) => {
	return Math.floor(Math.random() * (max + 1))
}

//https://www.30secondsofcode.org/js/s/random-hex-color-code/
const getRandomHex = (): string => {
	return `#${(getRandomNumber(255) * 0xfffff * 1000000)
		.toString(16)
		.slice(0, 6)}`
}

const getRandomRgb = (): string => {
	const r = getRandomNumber(255)
	const g = getRandomNumber(255)
	const b = getRandomNumber(255)
	return `${r}, ${g}, ${b}`
}

const getRandomHsl = (): string => {
	const h = getRandomNumber(360)
	const s = getRandomNumber(100)
	const l = getRandomNumber(100)
	return `${h}, ${s}, ${l}`
}

type ColorResponse = {
	hex: string
	rgb: string
	hsl: string
}

app.get('/color/api', (req, res: Response<ColorResponse>) => {
	const randomHEX = getRandomHex()
	const randomRGB = getRandomRgb()
	const randomHSL = getRandomHsl()

	res.json({
		hex: randomHEX,
		rgb: randomRGB,
		hsl: randomHSL,
	})
})

app.get('/login/:username', (req, res) => {
	res.send('Hello ' + req.params.username)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!!!!!!!')
})

app.get('/about', (req: Request, res: Response) => {
	res.send('About AsdPage')
})

app.get('/color', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../public/color.html'))
})
