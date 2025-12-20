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
  // Fallback to hardcoded URL if env var is not set (for production builds)
  const envUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
  const fallbackUrl = 'https://script.google.com/macros/s/AKfycbxLcuFznQGhIFh7eiLDpV-xU4Lr_gP-n64IVYYphuNw9s0lDZBEjUlDe__3N7N4JRHQ9w/exec';
  const scriptUrl = envUrl || fallbackUrl;

  // Log if using fallback URL
  if (!envUrl) {
    console.warn('⚠️ Using fallback Google Apps Script URL (env var not set)');
  }

  console.log('📤 Submitting to Google Sheets:', { 
    scriptUrl: scriptUrl.substring(0, 50) + '...', // Log partial URL for security
    entry 
  });

  try {
    // Google Apps Script Web Apps work reliably with 'no-cors' mode
    // The data will still be sent and received, we just can't read the response
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script Web Apps
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    
    // With no-cors mode, we can't read the response, but the request is sent
    console.log('✅ Request sent to Google Sheets');
    console.log('   Data submitted:', {
      intent: entry.intent,
      userType: entry.userType,
      phone: entry.phone.substring(0, 3) + '****' + entry.phone.slice(-3), // Partially mask phone
      timestamp: entry.timestamp
    });
    console.log('   Note: Using no-cors mode (cannot verify response).');
    console.log('   Check your Google Sheet to confirm the entry was added.');
    return true; // Assume success - data should be received by the script
  } catch (error) {
    console.error('❌ Error submitting to Google Sheets:', error);
    console.error('   Error details:', {
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    
    console.error('\n🔍 Troubleshooting tips:');
    console.error('   1. Check if the Google Apps Script URL is correct');
    console.error('   2. Verify the script is deployed with "Anyone" access');
    console.error('   3. Check Google Apps Script → Executions tab for errors');
    console.error('   4. Test the URL directly in browser (GET request should show JSON)');
    console.error('   5. Make sure you created a new deployment version after script changes');
    
    return false;
  }
}

