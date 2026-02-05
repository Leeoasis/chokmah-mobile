#!/usr/bin/env node

/**
 * API Test Script
 * 
 * This script tests the Chokmah backend API endpoints to help diagnose
 * authentication and connectivity issues.
 * 
 * Run with: node test-api.js
 */

const http = require('http');
const https = require('https');
const url = require('url');

// Read API URL from environment or use localhost by default
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

console.log('\n' + '='.repeat(60));
console.log('🧪 Chokmah API Test Script');
console.log('='.repeat(60));
console.log(`Testing API at: ${API_BASE_URL}`);
console.log('='.repeat(60) + '\n');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    // Choose http or https based on protocol
    const protocol = options.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testBackendConnectivity() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Test 1: Backend Connectivity', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const parsedUrl = new url.URL(API_BASE_URL);
    const options = {
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: '/',
      method: 'GET',
    };
    
    const response = await makeRequest(options);
    log(`✅ Backend is reachable`, 'green');
    log(`   Status: ${response.status}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Backend is NOT reachable`, 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

async function testLoginEndpoint() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Test 2: Login Endpoint', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  const parsedUrl = new url.URL(API_BASE_URL);
  const testData = {
    user: {
      email: 'test@example.com',
      password: 'testpassword123'
    }
  };
  
  const options = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: '/api/v1/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  
  try {
    log(`   Testing: POST ${API_BASE_URL}/api/v1/login`, 'blue');
    log(`   Payload: ${JSON.stringify(testData, null, 2)}`, 'blue');
    
    const response = await makeRequest(options, testData);
    
    log(`   Status: ${response.status}`, response.status === 401 ? 'yellow' : 'green');
    log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'blue');
    
    if (response.status === 401) {
      log(`\n   ℹ️  401 is expected with test credentials`, 'yellow');
      log(`   ℹ️  This means the endpoint EXISTS and is working`, 'yellow');
      log(`   ℹ️  Try with valid credentials in the app`, 'yellow');
      return true;
    } else if (response.status === 200) {
      log(`   ✅ Login endpoint is working!`, 'green');
      return true;
    } else if (response.status === 404) {
      log(`   ❌ Login endpoint NOT FOUND`, 'red');
      log(`   ℹ️  The endpoint path might be wrong`, 'yellow');
      return false;
    } else {
      log(`   ⚠️  Unexpected status code`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`   ❌ Request failed: ${error.message}`, 'red');
    return false;
  }
}

async function testRegisterEndpoint() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Test 3: Register Endpoint', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  const parsedUrl = new url.URL(API_BASE_URL);
  const testData = {
    user: {
      email: 'test@example.com',
      password: 'testpassword123',
      password_confirmation: 'testpassword123',
      role: 'teacher'
    }
  };
  
  const options = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: '/api/v1/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  
  try {
    log(`   Testing: POST ${API_BASE_URL}/api/v1/signup`, 'blue');
    
    const response = await makeRequest(options, testData);
    
    log(`   Status: ${response.status}`, response.status < 400 ? 'green' : 'yellow');
    log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'blue');
    
    if (response.status === 422) {
      log(`\n   ℹ️  422 might mean user already exists or validation error`, 'yellow');
      log(`   ℹ️  This means the endpoint EXISTS and is working`, 'yellow');
      return true;
    } else if (response.status === 201 || response.status === 200) {
      log(`   ✅ Register endpoint is working!`, 'green');
      return true;
    } else if (response.status === 404) {
      log(`   ❌ Register endpoint NOT FOUND`, 'red');
      return false;
    }
    
    return true;
  } catch (error) {
    log(`   ❌ Request failed: ${error.message}`, 'red');
    return false;
  }
}

async function runDiagnostics() {
  log('\n');
  log('═══════════════════════════════════════════════════════════', 'bright');
  log('         CHOKMAH API DIAGNOSTIC REPORT', 'bright');
  log('═══════════════════════════════════════════════════════════', 'bright');
  log(`         API Base URL: ${API_BASE_URL}`, 'cyan');
  log('═══════════════════════════════════════════════════════════', 'bright');
  
  const results = {
    connectivity: false,
    login: false,
    register: false,
  };
  
  // Run tests
  results.connectivity = await testBackendConnectivity();
  
  if (results.connectivity) {
    results.login = await testLoginEndpoint();
    results.register = await testRegisterEndpoint();
  } else {
    log('\n⚠️  Skipping endpoint tests due to connectivity failure', 'yellow');
  }
  
  // Summary
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('SUMMARY', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  log(`Backend Reachable:     ${results.connectivity ? '✅ YES' : '❌ NO'}`, 
      results.connectivity ? 'green' : 'red');
  log(`Login Endpoint:        ${results.login ? '✅ WORKING' : '❌ FAILED'}`, 
      results.login ? 'green' : 'red');
  log(`Register Endpoint:     ${results.register ? '✅ WORKING' : '❌ FAILED'}`, 
      results.register ? 'green' : 'red');
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('RECOMMENDATIONS', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  if (!results.connectivity) {
    log('❌ Backend is not reachable:', 'red');
    log('   1. Check your internet connection', 'yellow');
    log('   2. Verify the backend URL is correct', 'yellow');
    log('   3. Check if backend is running (Render.com may sleep)', 'yellow');
    log('   4. Try accessing the URL in your browser', 'yellow');
  } else if (!results.login || !results.register) {
    log('⚠️  Some endpoints are not working:', 'yellow');
    log('   1. Verify API endpoint paths are correct', 'yellow');
    log('   2. Check request payload structure', 'yellow');
    log('   3. Review the API documentation', 'yellow');
  } else {
    log('✅ All tests passed!', 'green');
    log('   1. Backend is reachable', 'green');
    log('   2. Login endpoint is working', 'green');
    log('   3. Register endpoint is working', 'green');
    log('', '');
    log('   Next steps:', 'cyan');
    log('   - Try signing in with valid credentials in the app', 'blue');
    log('   - Check the mobile app console for detailed logs', 'blue');
    log('   - Review API_ENDPOINTS_GUIDE.md for endpoint details', 'blue');
  }
  
  log('\n═══════════════════════════════════════════════════════════\n', 'bright');
  
  // Exit code
  process.exit(results.connectivity && results.login ? 0 : 1);
}

// Run the diagnostics
runDiagnostics().catch((error) => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
