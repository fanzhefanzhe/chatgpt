import { rateLimit } from 'express-rate-limit'
import { isNotEmptyString } from '../utils/is'

const MAX_REQUEST_PER_HOUR = process.env.MAX_REQUEST_PER_HOUR

const maxCount = (isNotEmptyString(MAX_REQUEST_PER_HOUR) && !isNaN(Number(MAX_REQUEST_PER_HOUR)))
  ? parseInt(MAX_REQUEST_PER_HOUR)
  : 0 // 0 means unlimited

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Maximum number of accesses within an hour
  max: maxCount,
  statusCode: 200, // 200 means success，but the message is 'Too many request from this IP in 1 hour'
	trustProxy: true,
	message: async (req, res) => {
		res.send({ status: 'Fail', message: '你好，你的ip单小时访问量过高，私人专属不限量；如果需要大量访问，来小店看看吧！https://ff.huijia.cf', data: null })
	},
})

export { limiter }
