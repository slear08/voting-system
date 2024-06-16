@echo off
mode con: cols=60 lines=40
echo Server Starting...
cls
echo ============================================================
echo +                    SERVER IS RUNNING                     +     
echo +                  iSelect Voting System                   +
echo ============================================================
echo Credits:                                               
echo                     JOEVENEL EURANGO JR.
echo                       EDMAR DE GUZMAN
echo                         BIEN AGUIRE
echo ============================================================
echo                       ==Instructions==                                               
echo       * Copy the - Network: http://*.*.*.*:4000/ below                                        
echo       * Paste on your Web Browser                                                                                                                                                         
echo                       ***VOTE WISELY***                                                                                    
echo ============================================================

timeout /t 3 /nobreak >nul

cd client
yarn run dev --host | more
