CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  date_of_birth DATE,
  city VARCHAR(255),
  state VARCHAR(255),
  email VARCHAR(255),
  is_parent BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  access_level VARCHAR(255) NOT NULL
);

CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_family (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES "user"(id),
    family_id INT REFERENCES family(id)
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date DATE NOT NULL,
    detail TEXT,
    family_id INT REFERENCES family(id),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(255)
);

CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    event_id INT REFERENCES event(id),
    user_id INT REFERENCES "user"(id),
    attending BOOLEAN NOT NULL
);

CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    access_level VARCHAR(255) NOT NULL
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    detail TEXT,
    hidden BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES question(id),
    detail TEXT
);

CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES "user"(id),
    date DATE NOT NULL,
    question_id INT REFERENCES question(id),
    response TEXT
);

CREATE TABLE prompt (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    detail TEXT,
    hidden BOOLEAN DEFAULT FALSE
);

CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    prompt_id INT REFERENCES prompt(id),
    user_id INT REFERENCES "user"(id),
    date DATE NOT NULL,
    detail TEXT

);

-- INSERT INTO "user" (first_name, last_name, state, city, date_of_birth, password, username, access_level)
-- VALUES ('John', 'Doe', 'CA', 'San Francisco', '1990-01-01', 'password', 'jerry@gmail.com', 'admin');

INSERT INTO family (id)
VALUES (1);

INSERT INTO user_family (user_id, family_id)
VALUES (1, 1);

INSERT INTO event (date, detail, family_id, time, type)
VALUES ('2020-01-01', 'New Years', 1, '2020-01-01 00:00:00', 'holiday');

INSERT INTO user_event (event_id, user_id, attending)
VALUES (1, 1, true);

INSERT INTO resource (access_level)
VALUES ('parent');

INSERT INTO response (user_id, date, question_id, response, score)
VALUES (1, '2020-01-01', 1, 'response', 1);

INSERT INTO journal (prompt_id, user_id, date, detail)
VALUES (1, 1, '2020-01-01', 'detail');

INSERT INTO prompt (detail) VALUES
('What do I want to do to maintain the relationship with my parents?'),
('What is it about my parents that makes me proud?'),
('What is something important I want to tell my parents about this process?'),
('What are your fears?'),
('What are your strengths?'),
('Who are you thankful/grateful for today?'),
('Make a list of places you would like to visit...'),
('What is your favorite space of comfort in your mom’s house and your dad’s house?'),
('Make a list of the things that make you happy/smile...'),
('What’s one thing you would like to grow in the next year?'),
('What’s upsetting you more than normal this week?'),
('What do you need to remember in going back and forth from house to house?'),
('What emotions are you feeling the most and why?'),
('What were your highs and lows of last week?'),
('What do you love most about yourself?'),
('When you’re sad, what activities elevate your mood?'),
('What type of home environment do I want from my parents?'),
('Write a letter to your mom or dad. What are some of their traits you’re grateful for?'),
('What comes to mind first when you think of what makes you safe?'),
('What makes you feel inspired?'),
('Describe a person or support system that has had a significant positive impact on your mental health.'),
('What is a hobby/activity that brings you joy.'),
('Write about a time when you laughed uncontrollably.'),
('What is your favorite thing to do in your freetime?'),
('Write about the most influential people in your life.'),
('Who is someone you can always talk to?'),
('Write about one positive thing that happened today? How did it make you feel?'),
('What makes you feel calm?'),
('What makes you feel powerful?'),
('Who do you trust most and why?');

INSERT INTO question (type, detail) VALUES
('single', 'I feel sad about my parents'' divorce.'),
('single', 'I feel angry about my parents'' divorce.'),
('single', 'I feel confused about the situation.'),
('single', 'I feel responsible for my parents'' divorce.'),
('single', 'I feel anxious about the future.'),
('single', 'I feel relief that my parents are getting a divorce.'),
('multi', 'How do you cope with the stress and emotions related to your parents'' divorce? (Select all that apply)'),
('single', 'Do you feel comfortable discussing your feelings and concerns about your parents'' divorce with them or other family members?'),
('short', 'What do you wish your parents understood about how you are feeling during their divorce?'),
('short', 'In what ways do you think your parents could better support you through this process?');

INSERT INTO question_options (question_id, detail) VALUES
(1, 'Strongly Disagree'),
(1, 'Disagree'),
(1, 'Neutral'),
(1, 'Agree'),
(1, 'Strongly Agree'),
(2, 'Strongly Disagree'),
(2, 'Disagree'),
(2, 'Neutral'),
(2, 'Agree'),
(2, 'Strongly Agree'),
(3, 'Strongly Disagree'),
(3, 'Disagree'),
(3, 'Neutral'),
(3, 'Agree'),
(3, 'Strongly Agree'),
(4, 'Strongly Disagree'),
(4, 'Disagree'),
(4, 'Neutral'),
(4, 'Agree'),
(4, 'Strongly Agree'),
(5, 'Strongly Disagree'),
(5, 'Disagree'),
(5, 'Neutral'),
(5, 'Agree'),
(5, 'Strongly Agree'),
(6, 'Strongly Disagree'),
(6, 'Disagree'),
(6, 'Neutral'),
(6, 'Agree'),
(6, 'Strongly Agree'),
(7, 'Talking to friends'),
(7, 'Talking to a counselor or therapist'),
(7, 'Journaling or writing'),
(7, 'Physical activity'),
(7, 'Creative outlets (e.g., art, music, writing)'),
(7, 'Other'),
(8, 'Yes'),
(8, 'No');

-- CREATE TABLE response (
--     id SERIAL PRIMARY KEY,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     user_id INT REFERENCES "user"(id),
--     date DATE NOT NULL,
--     question_id INT REFERENCES question(id),
--     response TEXT
-- );

-- add dummy data to the response table for each question I inserted above
INSERT INTO response (user_id, date, question_id, response)
VALUES (1, '2020-01-01', 1, 'Strongly Disagree'),
(1, '2020-01-01', 2, 'Strongly Disagree'),
(1, '2020-01-01', 3, 'Strongly Disagree'),
(1, '2020-01-01', 4, 'Strongly Disagree'),
(1, '2020-01-01', 5, 'Strongly Disagree'),
(1, '2020-01-01', 6, 'Strongly Disagree'),
(1, '2020-01-01', 7, 'Talking to a counselor or therapist|Physical activity'),
(1, '2020-01-01', 8, 'Yes'),
(1, '2020-01-01', 9, 'I wish my parents understood that I am feeling sad and confused about their divorce.'),
(1, '2020-01-01', 10, 'I think my parents could better support me by talking to me about their divorce and how it will affect me.');