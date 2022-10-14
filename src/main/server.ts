import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
app.listen(process.env.PORT, () => console.log(String.fromCodePoint(0x1F525) + ' Server is running on port ' + process.env.PORT))
