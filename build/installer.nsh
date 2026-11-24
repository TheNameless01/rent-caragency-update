; Custom NSIS installer hook for Gestion Agence de Location
; Preserves agency SQLite database, encrypted vault, and backups in %APPDATA% across upgrades and uninstalls.

!macro customInstall
  ; No destructive actions on %APPDATA%\Gestion Agence de Location
!macroend

!macro customUnInstall
  ; Preserve agency data directory (%APPDATA%\Gestion Agence de Location) intentionally
!macroend
