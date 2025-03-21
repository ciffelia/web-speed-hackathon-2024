import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';

import { INDEX_HTML_PATH } from '../constants/paths';
import { cacheControlMiddleware } from '../middlewares/cacheControlMiddleware';

import { adminApp } from './admin';
import { apiApp } from './api';
import { imageApp } from './image';
// import { ssrApp } from './ssr';
import { staticApp } from './static';

const app = new Hono();

app.use(secureHeaders());
app.use(
  cors({
    allowHeaders: ['Content-Type', 'Accept-Encoding', 'X-Accept-Encoding', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    exposeHeaders: ['Content-Encoding', 'X-Content-Encoding'],
    origin: (origin) => origin,
  }),
);
app.use(compress());
app.use(cacheControlMiddleware);

app.get('/healthz', (c) => {
  return c.body('live', 200);
});
app.route('/', staticApp);
app.route('/', imageApp);
app.route('/', apiApp);
app.route('/', adminApp);
// app.route('/', ssrApp);
app.get('*', async (c) => {
  return c.html(await fs.readFile(INDEX_HTML_PATH, 'utf-8'));
});

app.onError((cause) => {
  console.error(cause);

  if (cause instanceof HTTPException) {
    return cause.getResponse();
  }

  const err = new HTTPException(500, {
    cause: cause,
    message: 'Internal server error.',
  });
  return err.getResponse();
});

export { app };
