# The amazing Rotator.
A mostly useless jQuery rotator plugin.

[Demo page](https://alvinpascoe.com/demos/jquery/rotator/)

### Usage
```javascript
// Defaults to a subtle rotate.
$('body').rotator();

// Set speed to 500ms and anti-clockwise rotation.
$('h1').rotator({
  speed:500,
  reverse:true
});

// Set <article> and all immediate child elements to rotate a random
// speed and direction.
$('article').rotator({random:true});
```

### Settings
Option | Type | Default | Description
  --- | --- | --- | ---
 speed     | int | 5000 | Transition speed between rotational degree changes (in milliseconds).
 degree     | int     |  1 | Initial rotational degree change. 
 incrementor | int | 1 | Subsequent rotational degree changes.
 reverse | boolean | false | When true, rotates element anti-clockwise.
 random | boolean | false | When true, rotates element and immediate child elements a random speed and direction (when selected, this setting overrides all other settings).

### Methods
#### reset()
Destroy plugin and reset element.

If applied to an element that contains randomly rotating child elements, all child elements are also destroyed and reset. 
```javascript
// Destroy plugin and reset element.
$('body').rotator('reset');
```


