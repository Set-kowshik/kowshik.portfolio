# Google Sheets Integration Setup

Follow these steps to connect your contact form to Google Sheets:

## Step 1: Create a Google Apps Script

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Contact Form Submissions" or anything you prefer
3. Add these column headers in the first row:
   - A1: Name
   - B1: Email
   - C1: Message
   - D1: Timestamp

## Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.message,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon)
4. Name your project (e.g., "Contact Form Handler")

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - Description: "Contact Form"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/...../exec`)

## Step 4: Update Your Code

1. Open `src/components/ContactSection.tsx`
2. Find line ~85: `const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your copied Web app URL

Example:
```typescript
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
```

## Step 5: Test

1. Fill out and submit your contact form
2. Check your Google Sheet - you should see the submission appear!

## Troubleshooting

- Make sure "Who has access" is set to "Anyone" in deployment settings
- Use the `/exec` URL, not `/dev`
- Check the Apps Script execution logs: **Extensions > Apps Script > Executions**
