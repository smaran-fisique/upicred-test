/**
 * Submits waitlist entry to Google Sheets via Google Apps Script
 */

export interface WaitlistEntry {
  intent: string;
  userType: string;
  phone: string;
  timestamp: string;
}

/**
 * Submits a waitlist entry to Google Sheets
 * @param entry The waitlist entry data
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function submitToGoogleSheets(entry: WaitlistEntry): Promise<boolean> {
  // Get the Google Apps Script Web App URL from environment variable
  const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    console.error('Google Apps Script URL not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file.');
    return false;
  }

  console.log('Submitting to Google Sheets:', { scriptUrl, entry });

  try {
    // Send as JSON in the body for the doPost function to parse
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script to avoid CORS issues
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    // With no-cors, we can't read the response, but the request should be sent
    console.log('Request sent to Google Sheets (check your Apps Script Executions tab to verify)');
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
}

