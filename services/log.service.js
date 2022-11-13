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

const printWeather = (res) => {
    console.log(
        dedent`${chalk.bgCyanBright(`
        ====================
        = The weather in the city ${res?.name}: ${res?.weather[0]?.description}
        = Temperature: ${res?.main?.temp} (feel like ${res?.main?.feels_like})
        = Humidity: ${res?.main?.humidity}
        = Wind speed: ${res?.wind?.speed}
        ====================`
        )}`
    );
}

export {printError, printSuccess, printHelp, printWeather}