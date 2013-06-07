
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

.PHONY: menu
.PHONY: rebuild