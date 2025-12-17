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
    console.error('❌ Google Apps Script URL not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file.');
    console.error('Current env vars:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
    return false;
  }

  console.log('📤 Submitting to Google Sheets:', { 
    scriptUrl: scriptUrl.substring(0, 50) + '...', // Log partial URL for security
    entry 
  });

  try {
    // Send as JSON in the body for the doPost function to parse
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'cors', // Use cors mode to read response and verify success
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Sheets API returned an error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return false;
    }

    // Parse the response to verify success
    const responseText = await response.text();
    console.log('📥 Google Sheets response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      if (result.success === false) {
        console.error('❌ Google Sheets API reported failure:', result.error || result.message);
        return false;
      }
      console.log('✅ Successfully submitted to Google Sheets:', result);
      return true;
    } catch (jsonError) {
      // If response is not JSON, log it but assume success if status is 200
      console.warn('⚠️ Google Sheets response is not JSON:', responseText);
      // If we got a 200 response, assume success even if not JSON
      const success = response.status === 200;
      if (success) {
        console.log('✅ Assuming success based on 200 status code');
      }
      return success;
    }
  } catch (error) {
    console.error('❌ Error submitting to Google Sheets:', error);
    
    // Provide more detailed error information
    if (error instanceof TypeError) {
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        console.error('🔴 CORS or network error detected. This usually means:');
        console.error('   1. The Google Apps Script Web App is not deployed with "Anyone" access');
        console.error('   2. The script URL is incorrect');
        console.error('   3. The script needs a new deployment version after code changes');
        console.warn('🔄 Attempting fallback with no-cors mode...');
        
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
          });
          console.log('⚠️ Request sent with no-cors fallback (cannot verify success)');
          console.log('   Check your Google Apps Script Executions tab to verify if data was received');
          return true; // Assume success since we can't verify
        } catch (fallbackError) {
          console.error('❌ Fallback request also failed:', fallbackError);
          return false;
        }
      } else {
        console.error('❌ Network error:', error.message);
      }
    } else {
      console.error('❌ Unexpected error:', error);
    }
    return false;
  }
}

