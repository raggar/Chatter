// file to add and commit files efficiently

// exec method lets us run commands
const { exec } = require('child_process');

const args = process.argv;
// args = [node, file_path, text after "--"]

args.splice(0, 2);
const str = args.join(' ');

function CommitCb(err, strout, sdtin) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Done :)');
}

function AddCb(err, strout, sdtin) {
  if (err) {
    console.log(err);
    return;
  }
  exec(`git commit -m "${str}"`, CommitCb);
}

exec('git add .', AddCb);
