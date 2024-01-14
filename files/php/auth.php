
        <?php
            include("header.php");
        ?>

        <div class="translate">
            <div class="box">
                <span class="box-close">
                    <ion-icon name="close"></ion-icon>
                </span>

                <div class="content">

                    <h2>Accedi</h2>

                    <form novalidate name="login-form">
                        
                        <div class="input">
                            <span class="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" id='l-email' name='email' placeholder=" " autocomplete="email" required>
                            <label for="l-email">Email</label>
                        </div>
                        
                        <div class="input">
                            <span class="icon">
                                <ion-icon name="eye"></ion-icon>
                            </span>
                            <input type="password" id="l-password" name="password" placeholder=" " autocomplete="current-password" required>
                            <label for="l-password">Password</label>
                        </div>
                        
                        <div class="footer">
                            <span class="recovery-link">Password dimenticata?</span>
                        </div>

                        <button type="submit" class="button">Accedi</button>

                        <div class="notify-box">
                            <div class="notify">
                                        <span class="notify-title"></span>
                                        <span class="notify-text"></span>
                            </div>
                        </div>

                        <div class="register">
                            <p>
                                Non hai ancora un account?
                                <span class="login-link">Registrati!</span>
                            </p>
                        </div>

                    </form>
                </div>

                <div class="register-content">

                    <h2>Registrati</h2>

                    <form novalidate name="register-form">

                        <div class="top">

                            <div class="left">

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="person"></ion-icon>
                                    </span>
                                    <input type="text" id="r-username" name="username" placeholder=" " autocomplete="username" required>
                                    <label for="r-username">Username</label>
                                </div>

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    <input type="email" id="r-email" name="email" placeholder=" " autocomplete="email" required>
                                    <label for="r-email">Email</label>
                                </div>
                                
                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input type="password" id="r-password" name="password" placeholder=" " autocomplete="new-password" required>
                                    <label for="r-password">Password</label>
                                </div>

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input type="password" id="r-confirm-password" name="confirm-password" placeholder=" " autocomplete="new-password" required>
                                    <label for="r-confirm-password">Conferma password</label>
                                </div>

                            </div>

                            <div class="right">

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="help-circle"></ion-icon>
                                    </span>
                                    <select id="r-domanda-recovery" name='domanda-recovery' autocomplete="off">
                                    </select>
                                    <label for="r-domanda-recovery">Domanda di recovery</label>
                                </div>

                                <div class="input">
                                    <span class="icon">
                                    <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input id="r-risposta" name="risposta" placeholder=" " autocomplete="off" required>
                                    <label for="r-risposta">Risposta</label>
                                </div>
                                
                                <div class="input">
                                    <span class="icon">
                                    <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input id="r-conferma-risposta" name="conferma-risposta" placeholder=" " autocomplete="off" required>
                                    <label for="r-conferma-risposta">Conferma risposta</label>
                                </div>

                                <div class="notify">
                                    <span class="notify-title"></span>
                                    <span class="notify-text"></span>
                                </div>

                            </div>

                        </div>
                        
                        <div class="bottom">

                            <button type="submit" class="button">Registrati</button>

                            <div class="register">
                                <p>
                                    Hai già un account?
                                    <span class="register-link">Accedi!</span>
                                </p>
                            </div>

                        </div>

                    </form>

                </div>
                
                <div class="recovery-content">

                    <h2>Recupero password</h2>

                    <form novalidate name="recovery-form">

                        <div class="top">

                            <div class="left">

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    <input type="email" id="p-email" name="email" placeholder=" " autocomplete="email" required>
                                    <label for="p-email">Email</label>
                                </div>
                                
                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input type="password" id="p-password" name="password" placeholder=" " autocomplete="new-password" required>
                                    <label for="p-password">Nuova password</label>
                                </div>

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input type="password" id="p-confirm-password" name="confirm-password" placeholder=" " autocomplete="new-password" required>
                                    <label for="p-confirm-password">Conferma password</label>
                                </div>

                            </div>
                            
                            <div class="right">

                                <div class="input">
                                    <span class="icon">
                                        <ion-icon name="help-circle"></ion-icon>
                                    </span>
                                    <select id='p-domanda-recovery' name='domanda-recovery' autocomplete="off">
                                    </select>
                                    <label for="p-domanda-recovery">Domanda di recovery</label>
                                </div>

                                <div class="input">
                                    <span class="icon">
                                    <ion-icon name="eye"></ion-icon>
                                    </span>
                                    <input type="password" id="p-risposta" name="risposta" placeholder=" " autocomplete="off" required>
                                    <label for="p-risposta">Risposta</label>
                                </div>
                        
                                <div class="notify">
                                    <span class="notify-title"></span>
                                    <span class="notify-text"></span>
                                </div>

                            </div>

                        </div>
                        
                        <div class="bottom">

                            <button type="submit" class="button">Imposta nuova password</button>

                            <div class="register">
                                <p>
                                    Ti ricordi la password? 
                                    <span class="log-link">Accedi!</span>
                                </p>
                            </div>

                        </div>

                    </form>
                    
                </div>

            </div>
        </div>

        <script src="../js/auth.js"></script>