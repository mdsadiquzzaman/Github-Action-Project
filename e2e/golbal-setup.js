const { execSync } = require('child_process');

async function globalSetup() {
  console.log('\n🌍 Running Global Setup: Seeding Database...');
  try {
    execSync('npm run seed', { stdio: 'inherit' });
    console.log('✅ Database seeded successfully.');
  } catch (error) {
    console.error('❌ Database seeding failed.');
    process.exit(1);
  }
}

module.exports = globalSetup;