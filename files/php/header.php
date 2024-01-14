

        <header class="header">

            <div class="header-content">

                <h2 class="header-logo"><a href="./">Prato Fiorito</a></h2>
                    <ul class="header-menu">
                        <li><a class="header-link" href="./">Home</a></li>
                        <li><a class="header-link" href="newGame.php">Nuova partita</a></li>
                        <li><a class="header-link" href="ranking.php">Classifica</a></li>
                        <?php 
                            if(!isset($_SESSION['username'])){
                                echo '<li><button class="header-button-auth-popup">Accedi</button></li>';
                            }else{
                                echo '<li><a class="header-link" href="profile.php">Profilo</a></li>';
                            }

                        ?>
                        <li>
                            <div class="colors">
                                <ion-icon class="icon" name="moon"></ion-icon>
                                <div class="toggle-switch">
                                    <span class="switch"></span>
                                </div>
                                <ion-icon class="icon" name="sunny"></ion-icon>
                            </div>
                        </li>
                        <li><ion-icon id="audio" name="volume-high"></ion-icon></li>
                    </ul>

                    <div class="header-icons">
                        <div class="icon-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

            </div>

        </header>

        <script src="../js/header.js"></script>
