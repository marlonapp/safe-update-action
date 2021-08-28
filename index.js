const core = require('@actions/core');
const github = require('@actions/github');
const execSync = require('child_process').execSync;

try {

  const targetDir = core.getInput('dir');
  console.log(`Directory to backup: ${targetDir}!`);

  x = targetDir.rfind("/")
  const outputDir = targetDir[:x] + '/backup' + targetDir[x:]
  console.log(`Output directory: ${outputDir}!`);


  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  console.log(time)
  
  execSync(`mkdir ${outputDir}`, { encoding: 'utf-8' })
  execSync(`mkdir ${outputDir}/${time}`, { encoding: 'utf-8' })

  const output = execSync(`cp ${targetDir} ${outputDir}/${time}`, { encoding: 'utf-8' })
  console.log(output)

} catch (error) {
  core.setFailed(error.message);
}