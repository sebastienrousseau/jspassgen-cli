# SPDX-License-Identifier: Apache-2.0 OR MIT
#
# Rendered by `make demo` (vhs, https://github.com/charmbracelet/vhs) from
# the repository root after `npm ci`. On screen: the bin's version, a
# strong password with the defaults, then one of three 12-character
# chunks joined by dots. Every password shown is generated live and used
# nowhere. No network.
Output .github/demo.gif

Set Shell "bash"
Set FontSize 14
Set Width 1200
Set Height 240
Set Padding 20
Set Theme "Catppuccin Mocha"
Set WaitTimeout 30s
Set WaitPattern /^\$ ?$/

Hide
Type `export PS1='$ ' && clear`
Enter
Sleep 1s
Show

Type "node bin/jspassgen.js --version"
Sleep 500ms
Enter
Wait
Sleep 2s

Type "node bin/jspassgen.js generate"
Sleep 500ms
Enter
Wait
Sleep 3s

Type "node bin/jspassgen.js generate --length 12 --iteration 3 --separator ."
Sleep 500ms
Enter
Wait
Sleep 4s
