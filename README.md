#### tree_manager

* React based render, instead of "dom", custom services, modules, plugins used as react tree elements

> npm ci && npm run build && npm run execute

#### the story

* pluginOne depends on
    * serviceOne
    * serviceTwo

* pluginTwo depends on
    * serviceTwo

* serviceOne belongs to moduleOne and depends on
    * serviceThree

* service Two belongs to moduleTwo and depends on
    * serviceOne

* service Three belongs to moduleTwo and depends on
    * nothing (is point free)

##### pluginTwo load sequence:
1. serviceThree
2. serviceOne
3. serviceTwo

#### TODO:
* automatic event bubble up to the root
* auto event capture down to the target element

#### To read:
* https://github.com/harimohan1990/The-Reconciliation-Algorithm-in-React
* https://medium.com/@azizhk/building-an-async-react-renderer-with-diffing-in-web-worker-f3be07f16d90
* https://deepwiki.com/facebook/react/3-rendering-targets
