// Klig grammar definitions
//
Layout
  = l:Row+
    { return l; }
  / SPACE* EOF
    { return []; }

Row
  = r:Key* SPACE* EOL
    { return r; }

Key
  = SPACE* k:(Char / DeadKey / Editing / Modifier / Navigation / Unknown)
    { return k; }

// simple keys
//
Char
  = c:LETTER &SEP
    { return c; }

Unknown
  = u:(LETTER+)
    { return 'unknown:' + u.join(""); }

DeadKey "Dead key"
  = '[]'
    { return null; }
  / '[' d:LETTER ']'
    { return 'dead:' + d; }

// editing
//

Editing
  = backspace / delete / enter / insert / space / tab

backspace
  = ('BS'i / 'BKSP'i / 'BACKSPACE'i)
    { return 'BACKSPACE'; }

delete
  = ('DEL'i / 'DELETE'i)
    { return 'DELETE'; }
    
enter
  = ('ENTER'i / 'RET'i / 'RETURN'i)
    { return 'ENTER'; }
    
insert
  = ('INS'i / 'INSERT'i)
    { return 'INSERT'; }

space
  = 'SPACE'i
    { return 'SPACE'; }
    
tab
  = 'TAB'i
    { return 'TAB'; }

// modifiers
//
Modifier "Modifying key"
  = altgr / control / function / hyper / meta / shift / super

altgr
  = 'ALTGR'i
    { return 'ALTGR'; }

control
  = ('CONTROL'i / 'CTRL'i )
    { return 'CONTROL'; }

function
  = 'FN'i
    {return 'FN'; }

hyper
  = 'HYPER'i
    { return 'HYPER'; }

meta
  = ('ALT'i / 'META'i / 'OPTION'i )
    { return 'META'; }

shift
  = 'SHIFT'i
    { return 'SHIFT'; }

super
  = ('WINDOWS'i / 'WIN'i / 'WINKEY'i / 'SUPER'i / 'COMMAND'i )
    { return 'SUPER';}

// navigations
//
Navigation
  = end / esc / home / menu / pgup / pgdn

end
  = 'END'i
    { return 'END'; }

esc
  = 'ESC'i
    { return 'ESC'; }

home
  = 'HOME'i
    { return 'HOME'; }

menu 
  = 'MENU'i
    { return 'MENU'; }

pgup
  = 'PGUP'i / 'PAGEUP'i
    { return 'PAGEUP'; }

pgdn
  = 'PGDN'i / 'PAGEDOWN'i
    { return 'PAGEDOWN'; }

// basics
//
LETTER "Letter"
  = !SEP l:.
    { return l; }

SEP "Separator"
  = SPACE / EOL / EOF

SPACE "Space"
  = ' ' / '\t'

EOL "End of line"
  = '\r\n' / '\n' / '\r'

EOF "End of file"
  = !.
