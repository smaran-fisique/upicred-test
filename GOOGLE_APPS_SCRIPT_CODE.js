// Google Apps Script Code for CredUPI Waitlist
// Copy and paste this entire code into your Google Apps Script editor

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
    
    // Try to parse as JSON first (this is what the app sends)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try to get form parameters
        console.error('JSON parse error:', jsonError);
        data = {
          timestamp: e.parameter.timestamp || new Date().toISOString(),
          intent: e.parameter.intent || '',
          userType: e.parameter.userType || '',
          phone: e.parameter.phone || ''
        };
      }
    } else {
      // Fallback to parameters (for form-encoded data)
      data = {
        timestamp: e.parameter.timestamp || new Date().toISOString(),
        intent: e.parameter.intent || '',
        userType: e.parameter.userType || '',
        phone: e.parameter.phone || ''
      };
    }
    
    // Validate that we have at least some data
    if (!data.intent && !data.userType && !data.phone) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'No data provided' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
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
    console.log('Data received and saved:', data);
    
    // Return success response
    // Note: ContentService automatically handles CORS headers when deployed as Web App
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Entry saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to save entry'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS request for CORS preflight
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

