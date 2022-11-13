#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if(!token.length) {
        printError('The token was not transferred')
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY?.token, token)
        printSuccess('Token is saved')
    } catch(e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('The city was not transferred')
        return
    }
    try{
        const isValid = await getWeather(city)
        if(isValid){
            await saveKeyValue(TOKEN_DICTIONARY?.city, city)
            printSuccess('City is saved')
            getForcast(isValid)
        } else {
            printError('The city is not valid')
        }
    } catch(e) {
        printError(e.message + '\n ==> The city is not valid')
    }
}

const getForcast = async (data) => {
    try{
        const city = await getKeyValue(TOKEN_DICTIONARY?.city)
        const weather = !data ? await getWeather(city) : data
        printWeather(weather);
    } catch(e) {
        if (e?.response?.status === 404){
            printError('City name is wrong')
        }
        if (e?.response?.status === 401){
            printError('Token is not valid')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv) 
    if (args.h){
        return printHelp();
    }
    if (args.s){
        return saveCity(args.s)
    }
    if (args.t){
        return saveToken(args.t)
    }
    getForcast()
}

initCLI() 