// file to add and commit files efficiently

//exec method lets us run commands
const { exec } = require("child_process");

let args = process.argv;
// args = [node, file_path, text after "--"]

args.splice(0, 2);
let str = args.join(" ");
console.log("ARGUEMENTS", str);

exec("git add .", add_cb);

function add_cb(err, strout, sdtin) {
	if (err) {
		console.log(err);
		return;
	}
	exec(`git commit -m "${str}"`, commit_cb);
}

function commit_cb(err, strout, sdtin) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Done :)");
}
