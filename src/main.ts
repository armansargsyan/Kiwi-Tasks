import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.port || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(`Server has been started on port ${PORT}...`);
});
