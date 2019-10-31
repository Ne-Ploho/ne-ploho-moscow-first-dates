#!/bin/sh
set -e
mkdir -p optimized

for FILE in ./*.jpg; do
  convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% -resize 400x "$FILE" "optimized/$FILE"
  convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% -resize 800x "$FILE" "optimized/$(echo "$FILE" | sed "s/.jpg/@2x.jpg/")"
done
