#!/bin/bash
# Качалка VALPOD — установка одной строкой
set -e
APP="$HOME/Applications/Качалка VALPOD.app"
T="$(mktemp -d)"
echo "→ Скачиваю Качалку VALPOD"
curl -fsSL "https://valpod87.github.io/fleshka/kachalka/Kachalka-VALPOD.zip" -o "$T/k.zip"
mkdir -p "$HOME/Applications"
rm -rf "$APP"
ditto -x -k "$T/k.zip" "$HOME/Applications"
xattr -dr com.apple.quarantine "$APP" 2>/dev/null || true
chmod +x "$APP/Contents/MacOS/Kachalka" "$APP/Contents/Resources/install.command"
rm -rf "$T"
echo "✓ Качалка лежит в «Программах» твоей домашней папки. Запускаю…"
open "$APP"
