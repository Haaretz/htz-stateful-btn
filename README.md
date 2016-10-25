# htz stateful btn

Manage buttons with state

## Installation
```bash
jspm install htz-stateful-btn=github:haaretz/htz-stateful-btn
```

## Usage
To initialize a stateful button:

```js
import statefulBtn from 'htz-stateful-btn';

const btnElem = document.getElementById('foo');

statefulBtn(btnElem [, inStateText, inStateClass]);
```

### Parameters

For convenience and flexibility, some arguments can be provided using 
data-attributes in the html. An argument provided to the function directly in 
JavaScript will always take precedence over ones provided using the html api.

| Parameter | Type | HTML Attribute | Notes |
| --- | --- | --- | --- |
| `btn` | `HTMLElement` | --- | The button to instantiate |
| `instateText` | `String` | `data-in-state-text` | Text used as a label for accessibility purposes when a button is stateful. |
| `inStateClass` | `String` | `data-in-state-class` | The class(es) to add when enabling state. |

### Events and instance methods
See the (documentation)[https://haaretz.github.io/htz-stateful-btn] for a review 
of events and (instance API)[https://haaretz.github.io/htz-stateful-btn/module-htz-stateful-btn.html#API].
