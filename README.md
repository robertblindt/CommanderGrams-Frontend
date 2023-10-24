# CommanderGrams Frontend
#### Hosted on Netlify
This project contains the React app that runs the Frontend for 'CommanderGrams' (hosted on netlify).  This app allows for a user to create a user instance, create and track decks, and request to see the NLP data that I analyzed as an administrative function.  The scraping portion of this project can be [found here](https://github.com/robertblindt/CommanderGrams-Scraper), and the backend can be [found here](https://github.com/robertblindt/CommanderGrams-Backend).

#### Full App Running at: https://commandergrams.netlify.app/

## Installation
This Repository is hosted on Netlify.com.  Running this locally should be relatively simple to set up.
Clone this repository.  From the command line run the following commands to set up your node modules:
```
npm install
```
From there you can just start up the app using:
```
npm run dev
```

## Project Overview
Creating a front end for this NLP analysis problem has been an interesting experience that has helped me focus my project scope.  Displaying the NLP learnings and giving users the ability to track how they are incorporating those terms were my first goals with the project.  I use Archidekt to build my decks and their front end experience is pretty polished.  My goal was not to create a smoother or better experience than them, rather to give additional insight to your deck building. 

- Used a variety of input and request methods to display findings
    - Home page returns Commanders 'common n_grams'
        - Points to terms that you might want to search for in cards
    - Once registered you can track your own deck
        - 'Deck dump' feature to quickly go from archidekt to my app!
        - Add 'search terms' that will be counted in your deck

## Future Improvements
- Create a 'Suggested Search Term' Radio/Drop-down for the deck builder based on the commander selected and their n-grams.
    - Using an if statement for a dropdown under the manual entry box should be pretty easy to do as is.
        - It might not be super useful to use that output in the regex function though due to the n-grams being lemmatized.  I might want to lemmatize the cards text before doing the regex function to make that more useful.
- Create a set of common 'Suggested Search Terms' aswell.
    - I could just manually add some stuff, but I want to avoid using personal bias or manual entry in this project.

*The majority of the [Backend Improvements](https://github.com/robertblindt/CommanderGrams-Backend) would result in changes to the front end aswell.*

*[Parent Project Repository](https://github.com/robertblindt/CommanderGrams-Parent)*