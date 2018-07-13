# LIRI
A Language Interpretation and Recognition Interface similar to SIRI.

It can take 4 different commands:
                            movie-this
                            my-tweets
                            spotify-this-song
                            do-what-it-says

movie-this & spotify-this-song both have an optional field that allows the user to type in their song/movie.
If their is no text in that field a pre-determined song/movie will be called through the respected api. After the request is made, a small wall of text is displayed.

my-tweets will display the last 20 available tweets for the specific user in the code.

do-what-it-says will read a line of text in random.txt and use it to run one of the other three commands.

Every input is logged into log.txt



# Currently Maintaining this on https://github.com/JMatt21/LIRI

# Deployed on https://jmatt21.github.io/LIRI/
