#### tree_manager

* React based render, instead of "dom", custom services, modules, plugins used as react tree elements

> node 16, npm 9.8.1

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
