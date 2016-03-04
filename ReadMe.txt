

Started getting this error in the browser only:

Uncaught Error: [$injector:modulerr] Failed to instantiate module starter due to:

Error: [$injector:modulerr] Failed to instantiate module starter-services due to:

Error: [$injector:modulerr] Failed to instantiate module ads-service due to:

Error: [$injector:nomod] Module 'ads-service' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.

Worked properly until today - 4th March, 2016.

Also today, it worked when loaded first time.

Solution: crashed ads-service and services module into 1.