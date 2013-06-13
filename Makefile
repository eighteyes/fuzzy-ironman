
PRINT = ./bin/printmenu.sh
PRINTFLAGS =
ifdef t
  PRINTFLAGS += -t $(t)
endif

menu:
	@echo $(PRINT) $(PRINTFLAGS)
	@$(PRINT) $(PRINTFLAGS)

rebuild:
	migrate down
	@echo ""
	migrate up
	node gen.js

test:
	mocha -R spec tests/test.js

.PHONY: menu
.PHONY: rebuild