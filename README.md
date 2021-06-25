# knowitall
A bot that automatically answers dank memer trivia questions

![a](https://raw.githubusercontent.com/PreciousWarrior/knowitall/main/image.png)

# How it works

So a friend of mine asked me to make a bot that answers Dank Memer trivia questions, and so I decided to create this project. After googling some of the questions that dank memer asks, we can find them all on OpenTriviaDB, which is a database of trivia questions. Ironically, they do not provide a database download, but just an API that you can use to access random questions. Therefore, it takes a lot of time to pretty much call the API (especially for the last 50ish questions) and download all the 4050 trivia questions in their database (which they advertise on their website). I could probably improve the efficiency of the scraper, by doing concurrent asynchronous requests whilst not being rate limited, as well as check whether a question exists. But it does only take a few minutes, and It Works™. The scraper runs every hour or so on a dedicated server along with the bot, and updates the file containing all the MCQ questions and correct answers of TriviaDB. I then download this file from github using the bot and use those results to answer any questions made by the bot.

[Scraper](https://github.com/PreciousWarrior/knowitall-scraper)
