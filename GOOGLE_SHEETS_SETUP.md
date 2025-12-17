# Google Sheets Setup Guide

This guide will help you set up Google Sheets to receive waitlist entries from your application without needing a backend server.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "CredUPI Waitlist"
4. In the first row, add these column headers:
   - `Timestamp`
   - `Intent`
   - `User Type`
   - `Phone`

Your sheet should look like this:

| Timestamp | Intent | User Type | Phone |
|-----------|--------|-----------|-------|
|           |        |           |       |

## Step 2: Create a Google Apps Script

1. In your Google Sheet, click on **Extensions** → **Apps Script**
2. Delete any default code and paste the following:

```javascript
// Handle GET requests (for testing/debugging)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK', 
      message: 'Google Apps Script is running. Use POST to submit waitlist entries.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests (for form submissions)
function doPost(e) {
  try {
    let data;
    
    // Try to parse as JSON first
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try to get form parameters
        data = {
          timestamp: e.parameter.timestamp || new Date().toISOString(),
          intent: e.parameter.intent || '',
          userType: e.parameter.userType || '',
          phone: e.parameter.phone || ''
        };
      }
    } else {
      // Fallback to parameters
      data = {
        timestamp: e.parameter.timestamp || new Date().toISOString(),
        intent: e.parameter.intent || '',
        userType: e.parameter.userType || '',
        phone: e.parameter.phone || ''
      };
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append the data as a new row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.intent || '',
      data.userType || '',
      data.phone || ''
    ]);
    
    // Log for debugging (check Executions in Apps Script)
    console.log('Data received:', data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS request for CORS preflight
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (💾 icon) and give your project a name like "Waitlist Handler"

## Step 3: Deploy as Web App

1. Click on **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Waitlist Form Handler" (optional)
   - **Execute as**: "Me" (your account)
   - **Who has access**: "Anyone" (this allows your website to submit data)
4. Click **Deploy**
5. You'll be prompted to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** - this is what you'll use in your application

## Step 4: Configure Your Application

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following line with your Web app URL:

```
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your Web app URL.

3. Restart your development server for the environment variable to take effect:

```bash
npm run dev
```

## Step 5: Test It Out

1. Open your application
2. Fill out the waitlist form
3. Submit it
4. Check your Google Sheet - you should see a new row with the submitted data!

## Troubleshooting

### Data not appearing in the sheet?

1. **Check the browser console** (F12 → Console tab):
   - Look for any error messages
   - You should see "Submitting to Google Sheets:" with your data
   - You should see "Request sent to Google Sheets"

2. **Verify your Google Apps Script**:
   - Go to your Apps Script project
   - Click on **Executions** (clock icon on the left)
   - Check if there are any recent executions when you submit the form
   - If you see errors, click on them to see what went wrong
   - If you see successful executions but no data, check the logs

3. **Check your Google Sheet**:
   - Make sure the column headers in row 1 are exactly: `Timestamp`, `Intent`, `User Type`, `Phone`
   - Check if there are any rows being added (sometimes they appear at the bottom)
   - Make sure you're looking at the correct sheet tab

4. **Verify deployment settings**:
   - Make sure the Web app is deployed with **"Anyone"** access (not "Only myself")
   - Make sure **"Execute as"** is set to **"Me"**
   - After updating the script code, you MUST create a **new deployment version**:
     - Click **Deploy** → **Manage deployments**
     - Click the pencil icon (Edit)
     - Click **New version**
     - Click **Deploy**
     - The URL should remain the same

5. **Test the script directly**:
   - Visit your Web app URL in a browser
   - You should see a JSON response with `status: 'OK'`
   - If you see an error, the script needs to be fixed

6. **Check environment variable**:
   - Make sure your `.env` file has the correct URL
   - Make sure you restarted the dev server after creating/updating `.env`
   - Check the browser console - if you see "Google Apps Script URL not configured", the env var isn't loading

### Getting CORS errors?
- The code uses `no-cors` mode, which is normal for Google Apps Script
- The data should still be submitted successfully even if you see CORS warnings in the console
- With `no-cors` mode, we can't read the response, but the data is still sent

### Need to update the script?
- After making changes to the Apps Script code, you need to create a **new deployment** (not just save)
- Click **Deploy** → **Manage deployments** → **Edit** (pencil icon) → **New version** → **Deploy**
- You can keep using the same URL, or update it in your `.env` file if a new URL is generated

## Security Notes

- The Web app URL is public, but only allows POST requests
- Consider adding basic validation or rate limiting in the Apps Script if needed
- For production, you might want to add additional security measures like:
  - Secret token validation
  - Rate limiting
  - IP whitelisting (though this is more complex with Google Apps Script)

## Alternative: Using a Secret Token

If you want to add a basic security layer, you can modify the Apps Script to check for a secret token:

**In Apps Script:**
```javascript
function doPost(e) {
  try {
    const SECRET_TOKEN = 'your-secret-token-here'; // Change this!
    const data = JSON.parse(e.postData.contents);
    
    // Verify token
    if (data.token !== SECRET_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // ... rest of the code
  } catch (error) {
    // ... error handling
  }
}
```

**In your application** (`src/lib/googleSheets.ts`), add the token:
```typescript
body: JSON.stringify({
  ...entry,
  token: import.meta.env.VITE_GOOGLE_SHEETS_TOKEN,
}),
```

And add to `.env`:
```
VITE_GOOGLE_SHEETS_TOKEN=your-secret-token-here
```
