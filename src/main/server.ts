import 'module-alias/register'
import { MongoConnect } from '@/infra/mongodb/mongo-helper'
import dotenv from 'dotenv'

dotenv.config()
MongoConnect.connect(process.env.MONGODB_URI)
  .then(async () => {
    const { setupApp } = await import ('./config/app')
    const app = await setupApp()
    app.listen(process.env.PORT, () => console.log(String.fromCodePoint(0x1F525) + ' Server is running on port ' + process.env.PORT))
  })
  .catch(console.error)
