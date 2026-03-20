import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCourseRoute } from './src/routes/get-course.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCourseRoute)
server.register(getCourseByIdRoute)



server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
