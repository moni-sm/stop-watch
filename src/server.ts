import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { bootstrapApplication } from '@angular/platform-browser';

const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/angular-stopwatch/browser');

const app = express();

// Serve static files
app.get('*.*', express.static(DIST_FOLDER, { maxAge: '1y' }));

// Handle all other routes
app.get('*', async (req, res) => {
  try {
    const indexHtml = readFileSync(join(DIST_FOLDER, 'index.html'), 'utf8');

    const html = await renderApplication(() => bootstrapApplication(AppComponent, config), {
      document: indexHtml,
      url: req.originalUrl,
      // 🚫 No 'appId' here
    });

    res.status(200).send(html);
  } catch (err) {
    console.error('Error during server-side rendering:', err);
    res.status(500).send('Error rendering app');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Node Express server listening on http://localhost:${PORT}`);
});
