#!/bin/sh

./node_modules/.bin/contentful space import --space-id="$CONTENTFUL_SPACE_ID" --mt="$CONTENTFUL_MANAGEMENT_TOKEN" --content-file "$1"