#!/bin/sh

mkdir -p export-data

./node_modules/.bin/contentful space export --space-id="$CONTENTFUL_SPACE_ID" --mt="$CONTENTFUL_MANAGEMENT_TOKEN" --export-dir="export-data" --content-only