# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9bbde29a-0606-43dd-b2b2-6e36fea782ea

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9bbde29a-0606-43dd-b2b2-6e36fea782ea) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Contact form email integration

This project is configured to send contact form submissions to your email using EmailJS from the client-side.

### Setup

1. Create an account at `https://www.emailjs.com/`.
2. Create an email service (e.g., Gmail, SMTP) and note the Service ID.
3. Create a template with variables: `from_name`, `reply_to`, `message`. Note the Template ID.
4. Get your Public Key from the EmailJS dashboard.
5. Create a local `.env` file at the project root with:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

6. Restart the dev server.

The contact form component `src/components/ContactSection.tsx` reads these values via `import.meta.env` and sends the email using `@emailjs/browser`.

## Google Sheets integration (optional)

You can also log each contact form submission to a Google Sheet via a Google Apps Script Web App.

### Setup

1. Open your Google Sheet and go to Extensions → Apps Script.
2. Create a new script with the following basic handler:

```
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.message,
    data.timestamp || new Date().toISOString(),
  ]);
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → New deployment → Type: Web app. Set access to Anyone.
4. Copy the Web app URL and add it to your `.env`:

```
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXX/exec
```

5. Restart the dev server.

The contact form will POST `{ name, email, message, timestamp }` to this endpoint and reset the form on success.

### Optional: SMS notification to your phone (Twilio via Apps Script)

To receive an SMS at `+91 9346062068` on each submission, add Twilio to your Apps Script (server-side, so your credentials stay private).

1. In Apps Script, go to Project Settings → Script properties and add:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER` (your Twilio number, e.g., `+1xxxxxxxxxx`)

2. Use this extended `doPost` in your Apps Script:

```
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.message,
    data.timestamp || new Date().toISOString(),
  ]);

  // Send SMS via Twilio
  try {
    var props = PropertiesService.getScriptProperties();
    var sid = props.getProperty('TWILIO_ACCOUNT_SID');
    var token = props.getProperty('TWILIO_AUTH_TOKEN');
    var from = props.getProperty('TWILIO_FROM_NUMBER');
    var to = '+919346062068';

    var payload = {
      To: to,
      From: from,
      Body: 'New contact from ' + data.name + ' (' + data.email + '): ' + data.message
    };

    var options = {
      method: 'post',
      payload: payload,
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(sid + ':' + token)
      },
      muteHttpExceptions: true
    };

    var url = 'https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json';
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    // Optionally log errors to a sheet or Stackdriver
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy the Web app again after adding properties/changes.

Notes:
- Ensure your Twilio number is enabled for international SMS to India or use a messaging service per Twilio docs.
- Alternatively, use other SMS providers with similar HTTP APIs.

### Optional: SMS via Infobip (Apps Script)

If you prefer Infobip, you can send SMS using your base URL `ypnv19.api.infobip.com`.

1. In Apps Script → Script properties, add:
   - `INFOBIP_BASE_URL` = `ypnv19.api.infobip.com`
   - `INFOBIP_API_KEY` = your Infobip API key (starts with `App ` or raw key)
   - `INFOBIP_FROM` = Sender ID or phone number approved in Infobip

2. Add this helper in your `doPost` (or call it similarly where you append rows):

```
function sendInfobipSms(name, email, message) {
  var props = PropertiesService.getScriptProperties();
  var base = props.getProperty('INFOBIP_BASE_URL');
  var apiKey = props.getProperty('INFOBIP_API_KEY');
  var from = props.getProperty('INFOBIP_FROM');
  var to = '+919346062068';

  var url = 'https://' + base + '/sms/2/text/advanced';
  var payload = {
    messages: [
      {
        from: from,
        destinations: [{ to: to }],
        text: 'New contact from ' + name + ' (' + email + '): ' + message
      }
    ]
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: {
      Authorization: 'App ' + apiKey
    },
    muteHttpExceptions: true
  };

  return UrlFetchApp.fetch(url, options);
}
```

3. Call `sendInfobipSms(data.name, data.email, data.message);` inside `doPost` after appending to the Sheet.

Notes:
- Ensure your Infobip account and sender are allowed to send to `+91` numbers.
- If your API key is provided without the `App ` prefix, you can still prefix it in the header as shown.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9bbde29a-0606-43dd-b2b2-6e36fea782ea) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
