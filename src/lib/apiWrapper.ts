import axios from 'axios'
// import PostType from '../types/post';
import UserType from '../types/auth';
import DeckType from '../types/deck';
import CardType from '../types/card';
import DeckCollection from '../types/deck_collection';
import NGramType from '../types/ngram';
import SearchTermType from '../types/searchterm';

// const base: string = 'http://127.0.0.1:5000/api';
const base: string = 'https://commandergrams-api.onrender.com/api';
const tokenEndpoint: string = '/token';

// const cardsEndpoint: string = '/cards';
// const findCommanderEndPoint: string = '/findcommander';
const userEndPoint: string = '/users';
// const meEndPoint: string = '/me';
const deckEndpoint: string = '/deck'
const editEndPoint: string = '/edit'
const searchEndPoint: string = '/search'
const commanderSearch: string = '/findcommander'
const commanderEndPoint: string = '/commander'
const searchTermEndPoint: string = '/searchterm'
const dumpEndPoint:string = '/dump'
const availableCommanders:string = '/commanders'


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string,password:string) => axios.create({
    baseURL:base,
    headers:{
        Authorization: `Basic ` +  btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = {
    error?: string,
    data?: T
}

type TokenType = {
    token: string,
    token_expiration: string
}


async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(userEndPoint,newUserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong!'
        }
    }
    return {error,data}
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong!'
        }
    }
    return {data,error}
}


async function getMe(token:string): Promise<APIResponse<UserType>>{
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndPoint + '/me');
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}


async function getMyDecks(token:string): Promise<APIResponse<DeckType[]>>{
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(deckEndpoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getDeckById(token:string, deckId:number):Promise<APIResponse<DeckType>>{
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(deckEndpoint+`/${deckId}`+editEndPoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function editDeckById(token:string, deckId:string|number, editedDeckData:DeckType): Promise<APIResponse<DeckType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(deckEndpoint+`/${deckId}`+editEndPoint, editedDeckData)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function getMyDeckCards(token:string,deckId:string|number):Promise<APIResponse<DeckCollection[]>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).get(deckEndpoint+`/${deckId}`)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function searchForCard(token:string,cardName:string):Promise<APIResponse<Partial<CardType[]>>>{
    let error;
    let data;
    let jsonin = {"cardName":cardName}
    try {
        const response = await apiClientTokenAuth(token).post(searchEndPoint, jsonin)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function deleteDcById(token:string,cardName:string,deckId:number):Promise<APIResponse<void>>{
    let error;
    let data;
    let jsonin = {"cardName":cardName}
    try {
        // console.log(deckEndpoint+'/'+deckId)
        const response = await apiClientTokenAuth(token).delete(deckEndpoint+'/'+deckId, {data:jsonin})
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function addDcById(token:string,cardName:string,deckId:number):Promise<APIResponse<void>>{
    let error;
    let data;
    let jsonin = {"cardName":cardName}
    try {
        // console.log(deckEndpoint+'/'+deckId)
        // console.log(jsonin)
        const response = await apiClientTokenAuth(token).post(deckEndpoint+'/'+deckId, jsonin)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function editDcById(token:string,cardId:number,deckId:number, is_commander:boolean, is_maindeck:boolean):Promise<APIResponse<void>>{
    let error;
    let data;
    let jsonin = {
        "cardId":cardId,
        "deckId":deckId,
        "is_commander":is_commander,
        "is_maindeck":is_maindeck
    }
    try {
        // console.log(deckEndpoint+'/'+deckId)
        // console.log(jsonin)
        const response = await apiClientTokenAuth(token).put(deckEndpoint+'/'+deckId, jsonin)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function addDeck(token:string,deckName:string,description:string):Promise<APIResponse<void>>{
    let error;
    let data;
    let jsonin = {
        "deckName":deckName,
        "description":description
    }
    try {
        // console.log(deckEndpoint+'/'+deckId)
        // console.log(jsonin)
        const response = await apiClientTokenAuth(token).post(deckEndpoint, jsonin)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function deleteDeckById(token:string,deckId:number):Promise<APIResponse<void>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(deckEndpoint+'/'+deckId+editEndPoint)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function searchForCommander(commander:string):Promise<APIResponse<void>>{
    let error;
    let data;
    try {
        let j = {"commander":commander}
        const response = await apiClientNoAuth().post(commanderSearch,j)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function getNGrams(commander_name:string):Promise<APIResponse<NGramType[]>>{
    let error;
    let data;
    try {
        let j = {"cardName":commander_name}
        const response = await apiClientNoAuth().post(searchEndPoint+commanderEndPoint,j)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function addSearchTermToDB(token:string, deckId:number, search_term:string):Promise<APIResponse<void>>{
    let error;
    let data;
    const jsonin = {
        'deck_id': deckId,
        'search_term' : search_term}
    try {
        const response = await apiClientTokenAuth(token).post(deckEndpoint+'/'+deckId+searchTermEndPoint,jsonin)
        // console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function getSearchTerms(token:string, deckId:number):Promise<APIResponse<SearchTermType[]>>{
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(deckEndpoint+'/'+deckId+searchTermEndPoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function deleteSearchTerm(token:string, serchTermId:number):Promise<APIResponse<void>>{
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(deckEndpoint+'/'+serchTermId+searchTermEndPoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function deckTransferAPI(token:string, deckId:number, cardDump:string):Promise<APIResponse<void>>{
    let error;
    let data;
    let jsonin = {"cards":cardDump}
    try{
        const response = await apiClientTokenAuth(token).post(deckEndpoint+'/'+deckId+dumpEndPoint, jsonin);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getCommanderNames():Promise<APIResponse<string[]>>{
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(availableCommanders)
        data = response.data
    }catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}


export{
    getMe, 
    register, 
    login,
    getMyDecks,
    getDeckById,
    editDeckById,
    getMyDeckCards,
    searchForCard,
    deleteDcById,
    addDcById,
    editDcById,
    addDeck,
    deleteDeckById,
    searchForCommander,
    getNGrams,
    addSearchTermToDB, 
    getSearchTerms, 
    deleteSearchTerm,
    deckTransferAPI,
    getCommanderNames
}