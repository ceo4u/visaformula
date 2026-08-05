import { execSync } from 'child_process';
import readline from 'readline';

const EXPECTED_LOGIQALL_URL = 'git@github.com:logiqalltechnologies/formula.git';
const TARGET = process.argv[2] || 'all'; // 'origin', 'logiqall', or 'all'

function runCommand(command, options = {}) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: options.silent ? 'pipe' : 'pipe', ...options }).trim();
  } catch (error) {
    if (options.ignoreError) {
      return null;
    }
    throw error;
  }
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function ensureLogiqallRemote() {
  console.log('🔍 Checking git remotes...');
  const remotesRaw = runCommand('git remote -v');
  const remotes = remotesRaw.split('\n').filter(Boolean);

  const originExists = remotes.some(r => r.startsWith('origin\t'));
  const logiqallLine = remotes.find(r => r.startsWith('logiqall\t'));

  if (!originExists) {
    console.warn('⚠️  Warning: "origin" remote was not found!');
  } else {
    const originUrl = runCommand('git remote get-url origin');
    console.log(`✅ Verified remote "origin": ${originUrl}`);
  }

  if (!logiqallLine) {
    console.log(`➕ Adding remote "logiqall": ${EXPECTED_LOGIQALL_URL}`);
    runCommand(`git remote add logiqall ${EXPECTED_LOGIQALL_URL}`);
  } else {
    const currentLogiqallUrl = runCommand('git remote get-url logiqall');
    if (currentLogiqallUrl !== EXPECTED_LOGIQALL_URL) {
      console.log(`🔄 Updating remote "logiqall" URL to: ${EXPECTED_LOGIQALL_URL}`);
      runCommand(`git remote set-url logiqall ${EXPECTED_LOGIQALL_URL}`);
    }
  }
  
  const verifiedLogiqall = runCommand('git remote get-url logiqall');
  console.log(`✅ Verified remote "logiqall": ${verifiedLogiqall}`);
}

function getCurrentBranch() {
  const branch = runCommand('git branch --show-current');
  if (!branch) {
    throw new Error('Could not determine current Git branch (detached HEAD?).');
  }
  return branch;
}

function printSshTroubleshooting(remoteName, remoteUrl) {
  console.error('\n' + '='.repeat(75));
  console.error(`❌ SSH / Authentication Failed for remote "${remoteName}" (${remoteUrl})`);
  console.error('='.repeat(75));
  console.error(`\nIf you use multiple GitHub accounts, configure your SSH settings as follows:\n`);
  console.error(`1. Generate an SSH key pair for your secondary account (e.g. logiqall):`);
  console.error(`   ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519_logiqall\n`);
  console.error(`2. Add the public key content (~/.ssh/id_ed25519_logiqall.pub) to GitHub:`);
  console.error(`   GitHub -> Settings -> SSH and GPG keys -> New SSH key\n`);
  console.error(`3. Configure ~/.ssh/config for separate host aliases:`);
  console.error(`   Host github.com-logiqall`);
  console.error(`     HostName github.com`);
  console.error(`     User git`);
  console.error(`     IdentityFile ~/.ssh/id_ed25519_logiqall\n`);
  console.error(`4. Update the logiqall remote URL to use the custom SSH host alias:`);
  console.error(`   git remote set-url logiqall git@github.com-logiqall:logiqalltechnologies/formula.git\n`);
  console.error('='.repeat(75) + '\n');
}

async function pushToRemote(remoteName, branch) {
  const remoteUrl = runCommand(`git remote get-url ${remoteName}`);
  console.log(`\n🚀 Preparing to push branch "${branch}" to "${remoteName}" (${remoteUrl})...`);

  try {
    runCommand(`git push ${remoteName} ${branch}`, { silent: false });
    console.log(`✅ Successfully pushed branch "${branch}" to remote "${remoteName}".`);
    return;
  } catch (error) {
    const errorOutput = (error.stdout || '') + (error.stderr || '') + (error.message || '');
    
    // Check if error is due to SSH / Authentication failure
    if (errorOutput.includes('Permission denied (publickey)') || errorOutput.includes('Could not read from remote repository')) {
      printSshTroubleshooting(remoteName, remoteUrl);
      throw new Error(`Authentication failed for ${remoteName}`);
    }

    // Check if destination repository contains existing/divergent commits (non-fast-forward)
    const isNonFastForward = errorOutput.includes('non-fast-forward') || 
                             errorOutput.includes('fetch first') || 
                             errorOutput.includes('Updates were rejected') || 
                             errorOutput.includes('[rejected]');

    if (isNonFastForward) {
      console.warn(`\n⚠️  The remote "${remoteName}" contains commits that do not exist locally.`);
      console.warn(`    Automatic force pushing is DISABLED to protect your git history.\n`);
      
      console.log(`Please select how to proceed:`);
      console.log(`  [1] Normal push with merge/rebase (Pull remote changes first)`);
      console.log(`  [2] Force push (--force-with-lease) [OVERWRITES REMOTE REPO]`);
      console.log(`  [3] Cancel push for "${remoteName}"`);

      const answer = await askQuestion('\nEnter choice (1/2/3) [Default: 3]: ');

      if (answer === '1') {
        console.log(`\n📥 Fetching and merging from ${remoteName}/${branch}...`);
        try {
          runCommand(`git pull ${remoteName} ${branch} --no-rebase`, { silent: false });
          console.log(`🚀 Retrying push to ${remoteName}...`);
          runCommand(`git push ${remoteName} ${branch}`, { silent: false });
          console.log(`✅ Successfully pushed after merge to remote "${remoteName}".`);
        } catch (pullErr) {
          console.error(`❌ Merge failed. Please resolve conflicts manually and re-run push.`);
          throw pullErr;
        }
      } else if (answer === '2') {
        const confirm = await askQuestion(`\n⚠️ ARE YOU SURE you want to force push to ${remoteName}/${branch}? (yes/N): `);
        if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
          console.log(`\n⚡ Force pushing to ${remoteName}/${branch}...`);
          runCommand(`git push ${remoteName} ${branch} --force-with-lease`, { silent: false });
          console.log(`✅ Successfully force pushed to remote "${remoteName}".`);
        } else {
          console.log(`❌ Force push cancelled.`);
        }
      } else {
        console.log(`⏭️ Skipped pushing to "${remoteName}".`);
      }
    } else {
      console.error(`❌ Push failed to "${remoteName}":`, errorOutput);
      throw error;
    }
  }
}

async function main() {
  try {
    ensureLogiqallRemote();
    const branch = getCurrentBranch();
    console.log(`📌 Current Active Branch: "${branch}"`);

    if (TARGET === 'origin') {
      await pushToRemote('origin', branch);
    } else if (TARGET === 'logiqall') {
      await pushToRemote('logiqall', branch);
    } else if (TARGET === 'all') {
      console.log('\n========================================');
      console.log('🔄 Pushing to ALL remotes sequentially...');
      console.log('========================================');
      await pushToRemote('origin', branch);
      await pushToRemote('logiqall', branch);
      console.log('\n🎉 Finished pushing to all remotes!');
    } else {
      console.error(`Invalid target "${TARGET}". Valid targets: origin, logiqall, all`);
      process.exit(1);
    }
  } catch (err) {
    console.error('\n❌ Execution stopped:', err.message || err);
    process.exit(1);
  }
}

main();
