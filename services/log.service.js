import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR  ' + error));
}

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS  ' + msg));
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')} 
        Without parameters - weather output
        -s [CITY] for city settings
        -h for help output
        -t [API_KEY] for token save
        `
    );
}

export {printError, printSuccess, printHelp}