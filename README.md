# **Mars Rover Lite**

## **🚀 Objective**

Implement a function:

```js
export function executeInstructions(initialPosition, instructions) {
  // your code here
}
```

It should:

1. Parse the rover’s **starting position**
2. Execute a sequence of **movement and rotation** commands
3. Return the **final position** in the same string format

---

## **📌 Position Format**

The initial position is provided as a string:

```
"x y direction"
```

- `x` → integer (can be negative)
- `y` → integer
- `direction` → `N`, `E`, `S`, or `W`

Example:

```
"0 0 E"
"5 -2 N"
```

---

## **📌 Instruction Format**

The second argument is a string of commands:

- `L` → turn left 90°
- `R` → turn right 90°
- `M` → move forward in the current direction

Example:

```
"LMRMMMR"
```

---

## **📌 Movement Rules**

When the rover moves forward (`M`):

| Direction | Position Change |
| --------- | --------------- |
| `N`       | `(x, y + 1)`    |
| `E`       | `(x + 1, y)`    |
| `S`       | `(x, y - 1)`    |
| `W`       | `(x - 1, y)`    |

Turning only changes orientation, never position.

---

## **📤 Output Format**

The function must return the final state as:

```
"x y direction"
```

Example output:

```
"3 1 S"
```

---

## **🧪 Example**

Input:

```js
executeInstructions('0 0 E', 'LMRMMMR');
```

Should return:

```
"3 1 S"
```

## Suggestions

Try to use things you have learned in the recent past:

- Objects
- map/filter/reduce
- Closures(there maybe no reason)
- Desctructuring

Do not force fit anything. Keep reviewing code and implement ideas as they come along.
