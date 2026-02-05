/**
 * API Debugger Utility
 * 
 * This utility helps debug API calls by logging detailed information
 * about requests and responses.
 */

// Enable/disable debugging
export const DEBUG_ENABLED = __DEV__ || true; // Always enabled for now

/**
 * Log API request details
 */
export const logRequest = (method, url, data = null, headers = {}) => {
  if (!DEBUG_ENABLED) return;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔵 API REQUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: ${method.toUpperCase()}`);
  console.log(`URL: ${url}`);
  
  if (data) {
    console.log('Data:', JSON.stringify(data, null, 2));
  }
  
  if (headers && Object.keys(headers).length > 0) {
    console.log('Headers:', JSON.stringify(headers, null, 2));
  }
  
  console.log('Time:', new Date().toISOString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

/**
 * Log API response details
 */
export const logResponse = (method, url, status, data = null, duration = null) => {
  if (!DEBUG_ENABLED) return;

  const statusEmoji = status >= 200 && status < 300 ? '✅' : '❌';
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`${statusEmoji} API RESPONSE`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: ${method.toUpperCase()}`);
  console.log(`URL: ${url}`);
  console.log(`Status: ${status}`);
  
  if (duration) {
    console.log(`Duration: ${duration}ms`);
  }
  
  if (data) {
    console.log('Response Data:', JSON.stringify(data, null, 2));
  }
  
  console.log('Time:', new Date().toISOString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

/**
 * Log API error details
 */
export const logError = (method, url, error) => {
  if (!DEBUG_ENABLED) return;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔴 API ERROR');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Method: ${method.toUpperCase()}`);
  console.log(`URL: ${url}`);
  
  if (error.response) {
    // Server responded with error status
    console.log('Error Type: Server Error');
    console.log(`Status: ${error.response.status}`);
    console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
    console.log('Response Headers:', JSON.stringify(error.response.headers, null, 2));
  } else if (error.request) {
    // Request made but no response
    console.log('Error Type: Network Error');
    console.log('No response received from server');
    console.log('Request:', error.request);
  } else {
    // Something else happened
    console.log('Error Type: Unknown');
    console.log('Message:', error.message);
  }
  
  console.log('Full Error:', error);
  console.log('Time:', new Date().toISOString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

/**
 * Log authentication flow
 */
export const logAuthFlow = (step, data = null) => {
  if (!DEBUG_ENABLED) return;

  console.log('🔐 AUTH FLOW:', step);
  if (data) {
    console.log('Data:', JSON.stringify(data, null, 2));
  }
  console.log('');
};

/**
 * Test backend connectivity
 */
export const testBackendConnectivity = async (baseUrl) => {
  console.log('🧪 Testing Backend Connectivity...');
  console.log(`Base URL: ${baseUrl}`);
  
  try {
    const response = await fetch(baseUrl);
    console.log('✅ Backend is reachable');
    console.log(`Status: ${response.status}`);
    return true;
  } catch (error) {
    console.log('❌ Backend is NOT reachable');
    console.log('Error:', error.message);
    return false;
  }
};

/**
 * Test specific endpoint
 */
export const testEndpoint = async (baseUrl, endpoint, method = 'GET', data = null) => {
  const url = `${baseUrl}${endpoint}`;
  console.log(`🧪 Testing Endpoint: ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    const responseData = await response.json().catch(() => null);
    
    console.log(`✅ Endpoint response: ${response.status}`);
    if (responseData) {
      console.log('Response:', JSON.stringify(responseData, null, 2));
    }
    
    return { success: true, status: response.status, data: responseData };
  } catch (error) {
    console.log('❌ Endpoint test failed');
    console.log('Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Create a comprehensive API test report
 */
export const generateAPITestReport = async () => {
  const API_BASE_URL = 'https://chokmah-resources-backend.onrender.com';
  
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('         API DIAGNOSTIC REPORT');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  // Test 1: Backend connectivity
  console.log('📋 Test 1: Backend Connectivity');
  const isReachable = await testBackendConnectivity(API_BASE_URL);
  console.log('');
  
  // Test 2: Login endpoint structure
  console.log('📋 Test 2: Login Endpoint (POST /api/v1/login)');
  const loginTest = await testEndpoint(
    API_BASE_URL,
    '/api/v1/login',
    'POST',
    { user: { email: 'test@test.com', password: 'test' } }
  );
  console.log('Note: 401 is expected if credentials are wrong, but endpoint exists');
  console.log('');
  
  // Summary
  console.log('═══════════════════════════════════════════════════════════');
  console.log('SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Backend Reachable: ${isReachable ? '✅ YES' : '❌ NO'}`);
  console.log(`Login Endpoint: ${loginTest.success ? '✅ EXISTS' : '❌ FAILED'}`);
  console.log('');
  console.log('Next Steps:');
  if (!isReachable) {
    console.log('  1. Check your internet connection');
    console.log('  2. Verify the backend URL is correct');
    console.log('  3. Check if backend is running (Render.com may sleep)');
  } else if (!loginTest.success) {
    console.log('  1. Verify API endpoint paths are correct');
    console.log('  2. Check request payload structure');
  } else {
    console.log('  1. Try signing in with valid credentials');
    console.log('  2. Check the exact error message from the app');
    console.log('  3. Review API_ENDPOINTS_GUIDE.md for correct format');
  }
  console.log('═══════════════════════════════════════════════════════════\n');
  
  return {
    backendReachable: isReachable,
    loginEndpoint: loginTest,
  };
};

export default {
  logRequest,
  logResponse,
  logError,
  logAuthFlow,
  testBackendConnectivity,
  testEndpoint,
  generateAPITestReport,
};
