### Proof of Concept - ComputerCraft HTTP Requests
This is a simple Node.js server and client code for the ComputerCraft Minecraft mod, which shows how they can communicate with each other.  

<br>

## Setup:
1. Clone this repo, then run the server code (install Node.js, then run `node index`)
    - This has to run behind a domain and be available in the clearnet
    - Default port is `1337`, change it at the top of `index.js`
2. To install the client-side program in Minecraft, use this command in a computer: `pastebin get cpnZfbu2 httptest`
3. Run `edit httptest` and change the variables at the top to match your setup
    - Changing `reqBod` to a number will make the server return the factorial of the number
    - Changing `reqBod` to a string will make the server encode your entered text with base64 and return it
    - Removing `reqBod` completely or entering an invalid value will make the server respond with its current time
4. Run the command `httptest` in game to execute the client-side program

<br>

## License:
This code is licensed under the [MIT license](https://sv443.net/LICENSE)