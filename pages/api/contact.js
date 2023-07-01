import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      name,
      email,
      topic,
      description,
    } = req.body;

    const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID);

    try {
      await doc.useServiceAccountAuth({
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
      });
      await doc.loadInfo();

      const sheet = doc.sheetsById[process.env.NEXT_PUBLIC_SHEET_ID];

      const newRow = {
        FullName: name,
        Email: email,
        Topic: topic,
        Description: description,
        Date: new Date().toLocaleString(),
      };

      await sheet.addRow(newRow);

      res.status(200).json({ message: 'Success' });
    } catch (e) {
      console.error('Error: ', e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
