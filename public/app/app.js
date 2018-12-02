import './util/array-helper.js';
import { NotaService as service } from "./notas/notas-service.js";
import { takeUntil, debounceTimer, compose, partialize } from "./util/operators.js";
import { EventEmitter } from "./event/EventEmitter.js";

// const doTake = takeUntil(2, () => console.log('oi'));

// doTake();
// doTake();
// doTake();

// const partialTake = partialize(takeUntil, 2);
// const partialTakeConfig = partialTake(() => console.log('partialTake com partilize'));

// partialTakeConfig();
// partialTakeConfig();
// partialTakeConfig();

// const doDebounce = debounceTimer(500, () => console.log('timer'));

// doDebounce();
// doDebounce();
// doDebounce();
// doDebounce();

// const partialDeboun = partialize(debounceTimer, 500);

// const partialDebounConfig = partialDeboun(() => console.log('partialDeboun com partilize'))

// partialDebounConfig();
// partialDebounConfig();
// partialDebounConfig();
// partialDebounConfig();

const operations = compose(
    partialize(debounceTimer, 500),
    partialize(takeUntil, 3)
)

const getNotas = operations( () =>
    service
        .somaItens('2143')
        .then(total => EventEmitter.emit('sync-totalizadores', total))
        .catch(console.log)
);

document
    .querySelector('#myButton')
    .onclick = getNotas;