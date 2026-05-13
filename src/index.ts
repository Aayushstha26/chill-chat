import { prisma } from './lib/prisma';

async function checkDBConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : error);
    process.exit(1); // stop the server if DB is not connected
  }
}

checkDBConnection();