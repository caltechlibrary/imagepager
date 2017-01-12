#
# Makefile for JavaScript library
#

PROJECT = imagepager

VERSION = $(shell grep 'Version = "' $(PROJECT).js | cut -d\" -f 2)

BRANCH = $(shell git branch | grep '* ' | cut -d\  -f 2)

build:
	cp -v $(PROJECT).js demo/js/

status:
	git status

save:
	git commit -am "Quick Save"
	git push origin $(BRANCH)

refresh:
	git fetch origin
	git pull origin $(BRANCH)

clean: 
	if [ -d dist ]; then /bin/rm -fR dist; fi
	if [ -f $(PROJECT)-$(VERSION)-release.zip ]; then /bin/rm -fR $(PROJECT)-$(VERSION)-release.zip; fi

release: $(PROJECT).js
	mkdir -p dist
	cp -v README.md dist/
	cp -v LICENSE dist/
	cp -v INSTALL.md dist/
	cp $(PROJECT).js dist/$(PROJECT)-$(VERSION).js
	zip -r $(PROJECT)-$(VERSION)-release.zip dist/*


