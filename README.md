# MineSweeper: frontend and backend development of a website game

The project assignment was to develop both the frontend and the backend of a website game, in particular the game chosen was **MineSweeper**. The project was developed using **HTML**, **CSS**, **JavaScript**, **PHP** and **MySQL**.
- [MineSweeper: frontend and backend development of a website game](#minesweeper-frontend-and-backend-development-of-a-website-game)
  - [Documentation](#documentation)
  - [Project structure](#project-structure)
  - [Setup](#setup)
  - [Final evaluation and comments](#final-evaluation-and-comments)

For any issue or question, please don't hesitate to contact me!

## Documentation

> _This project was developed during "Web Design" course for the Bachelor's degree in Computer Engineering at the University of Pisa, so inner workings and implementation details are described in **italian**._

There is no particular documentation for this project, except for the **comments in the code** and **this README file**. 

However, the **main page of the website** includes a "Welcome" section, where the user can find how the site works, the rules of the game and the instructions to play it.

If you want to check the **tasks required** for the project, you can find them in the pdf file [here](specifiche.pdf).

One of the main requirements was to **validate** the HTML and CSS code of the website with [http://validator.w3.org/](http://validator.w3.org/) and [http://jigsaw.w3.org/css-validator/](http://jigsaw.w3.org/css-validator/). The results of the validation are the following:
<p>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="https://www.w3.org/Icons/valid-html401-blue"
            alt="CSS Valido!" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
            alt="CSS Valido!" />
    </a>
</p>

## Project structure

The project is structured in the following way:
- **`files/`** contains all the files used by the application, divided by type. In particular:
  - **`files/php/`** folder contains:
    - the PHP files used to implement **web pages** themselves;
    - [`files/php/redirector/`](files/php/redirector) folder contains the PHP files used to **redirect** the user requests to the correct manager;
    - [`files/php/manager/`](files/php/manager) folder contains the PHP files used to **manage** the user requests.
  - **`files/json/`** contains:
    - [`files/json/DBCredentials.json`](files/json/DBCredentials.json) json file used to store **database credentials**;
  - **`files/sql/`** contains:
    - [`files/sql/creazione.sql`](files/sql/creazione.sql) SQL file used to **create** the database;
    - [`files/sql/minesweeper.sql`](files/sql/minesweeper.sql) SQL file used to **populate** the database.
- **`esportaDB.sh`** is the **shell script** used to export the database, provided by the professor.
- **`specifiche.pdf`** is the **file** containing the main guidelines of the project, provided by the professor.
- **`README.md`** is the **file** you are reading right now :).


## Setup

You can download the latest zip file released from [here](https://github.com/EmanueleRsp/MineSweeper-Website-game/releases). 

For this project I used **XAMPP** to simplify everithing. In particular, I used **Apache** as web server and **MySQL** as database server.

If you don't have XAMPP installed, you can **download** it from [here](https://www.apachefriends.org/it/index.html).

Then, you have to **clone** this repository in the `htdocs` folder of XAMPP. If you don't know where it is, you can find it in the XAMPP Control Panel, in the "Apache" section, clicking on the "Config" button and then on the "Apache (httpd.conf)" item. In particular, you can find the path in the `DocumentRoot` field.

After that, you have to **setup connection credentials** in the [`files\json\DBCredentials.json`](files\json\DBCredentials.json) file, changing the `host`, `username`, `password` and `database` fields with your credentials.

Now, you have to **import** the database. To do that, you have to:
1. Open the XAMPP Control Panel;
2. Start the Apache and MySQL services;
3. Open your browser and go to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/);
4. Create a new database called `minesweeper`;
5. Click on the "Import" tab;
6. Click on the "Choose file" button and select the [`files\sql\creazione.sql`](files\sql\creazione.sql) file;
7. Click on the "Go" button.

Finally, you can **start** the game:
1. Open the XAMPP Control Panel;
2. Start the Apache and MySQL services;
3. Open your browser and go to [http://localhost/](http://localhost/).

**Enjoy!** 🌼


## Final evaluation and comments

The project was evaluated with a **score of 30/30 with honours**.

The professor really appretiated the **creativity** of the project, in particular the **design** of the website and the **implementation** of the game. He also liked the **modularity** of PHP code.
 
