export const prerender = false;
import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    // Auth configuration
    const clientEmail = import.meta.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      console.error('Faltan variables de entorno GOOGLE_CLIENT_EMAIL o GOOGLE_PRIVATE_KEY');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // The ID from the user's URL: https://docs.google.com/spreadsheets/d/1Vjow_CwnhAUMzxMxspA2g-tyD7ZjMteW7KCS3_32_RI/edit
    const spreadsheetId = '1Vjow_CwnhAUMzxMxspA2g-tyD7ZjMteW7KCS3_32_RI';

    // Append the row: Date and Email
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }), email]],
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
