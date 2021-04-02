DROP TABLE IF EXISTS jokes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL
);

CREATE TABLE jokes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    joke_id INT NOT NULL,
    setup TEXT NOT NULL,
    punchline TEXT NOT NULL,
    joke_type TEXT NOT NULL,
    linked_user INT REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users(user_name, user_email)
    VALUES
        ('Jane Doe', 'jane@doe.com'),
        ('John Doe', 'john@doe.com'),
        ('Jimmy Doe, JR', 'jjr@doe.com');

INSERT INTO jokes(joke_id, joke_type, setup, punchline, linked_user)
    VALUES
        (348, 'general', 'Why did the scarecrow win an award?', 'Because he was outstanding in his field.', 1),
        (216, 'general', 'What do you call a fashionable lawn statue with an excellent sense of rhythmn?', 'A metro-gnome', 1),
        (142, 'general', 'How many kids with ADD does it take to change a lightbulb?', 'Lets go ride bikes!', 2),
        (384, 'programming', 'A DHCP packet walks into a bar and asks for a beer.', 'Bartender says, here, but I’ll need that back in an hour!', 2),
        (160, 'general', 'What creature is smarter than a talking parrot?', 'A spelling bee.', 3);
