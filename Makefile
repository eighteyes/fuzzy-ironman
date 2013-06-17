
PRINT = ./bin/printmenu.sh
PRINTFLAGS =
ifdef t
  PRINTFLAGS += -t $(t)
endif

menu:
	@echo $(PRINT) $(PRINTFLAGS)
	@$(PRINT) $(PRINTFLAGS)

rebuild:
	node gen.js

test:
	mocha -R spec tests/test.js

mm:
	sudo nodev index.js

.PHONY: menu
.PHONY: rebuild
.PHONY: mm
