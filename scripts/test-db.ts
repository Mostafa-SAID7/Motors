import { createClient } from '@insforge/sdk';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
dotenv.config();

const baseUrl = process.env['VITE_INSFORGE_API_BASE_URL'];
const anonKey = process.env['VITE_INSFORGE_API_KEY'];

async function test() {
  if (!baseUrl || !anonKey) {
    console.error('❌ Missing environment variables');
    return;
  }

  console.log('🔗 Connecting to:', baseUrl);
  const client = createClient({ baseUrl, anonKey });

  try {
    const { data, error } = await client.database.from('cars').select('*');
    
    if (error) {
      console.error('❌ Database error:', error);
    } else {
      console.log('✅ Connection successful!');
      console.log(`📊 Found ${data?.length || 0} cars in the database.`);
      if (data && data.length > 0) {
        console.log('First car found:', data[0].brand, data[0].model);
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

test();
