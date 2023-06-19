# Puzzle.tech ecommerce Fullstack test
In order to run the project, you must clone this repository locally and run these commands on your terminal:
``` bash
npm install

npm start
```

After that, the server will be running on port 8000 and the client on port 5173. You'll be running the project locally so to access the client or server you must copy these links on your browser:

http://localhost:5173/ -> client

http://localhost:8000/ -> server

### It should look something like this:

<img width="800" alt="image" src="https://github.com/jech33/testPuzzleTech/assets/67987594/6990c1d2-dcd6-4113-a462-fc8afba760e4">
<img width="800" alt="image" src="https://github.com/jech33/testPuzzleTech/assets/67987594/fc436b50-7d22-440e-a95d-b480ca539f30">
<img width="800" alt="image" src="https://github.com/jech33/testPuzzleTech/assets/67987594/3217a964-2e0e-4279-9651-56241d737361">
<img width="399" alt="image" src="https://github.com/jech33/testPuzzleTech/assets/67987594/a50c604c-c51c-436d-b396-a3ee72d45832">
<img width="399" alt="image" src="https://github.com/jech33/testPuzzleTech/assets/67987594/3459130b-cc9c-4b0e-b0a3-afcfca0bbd47">



## Documentation
- 💪 [ReactJs Documentation](https://reactjs.org)
- 💪 [NodeJs Documentation](https://nodejs.org/en/docs)


## Code Style
This code is based on the good practices of the ESLint standard and uses Prettier for code formatting


## Commit Message Format and Structure

All commit messages **MUST** meet these rules:

``` bash
ISSUE :<Emoji>: <TYPE>(optional scope): <description>

[optional body]

[optional footer(s)]
```

BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking change (correlating with MAJOR in Semantic Versioning).

A BREAKING CHANGE can be part of commits of any type.

## Subject

The subject contains succinct description of the change:

- Limit the subject line to 50 characters
- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No dot (.) at the end

## Emojis

| Emoji                         | Raw Emoji Code                  | Type               | Description |
|:-----------------------------:|---------------------------------|--------------------|-------------|
| :sparkles:                 | `:sparkles:`                 | `FEAT`             | add **new feature** |
| :bug:                      | `:bug:`                      | `FIX`              | fix **bug** issue |
| :books:                    | `:books:`                    | `DOCS`             | update **documentation** |
| :lipstick:                 | `:lipstick:`                 | `STYLE`            | update **UI/Cosmetic** |
| :hammer:                   | `:hammer:`                   | `REFACTOR`         | **refactoring** or code **layouting** |
| :rocket:                   | `:rocket:`                   | `PERFORMANCE`      | fix **performance** issue |
| :rotating_light:           | `:rotating_light:`           | `TEST`             | add **tests**, fix **tests** failure |
| :package:                  | `:package:`                  | `BUILD`            | **packaging** or **bundling** or **building** |
| :construction_worker:      | `:construction_worker:`      | `CI`               | **CI** building |
| :back:                     | `:back:`                     | `REVERT`           | **revert** commiting |
| :truck:                    | `:truck:`                    | `MOVING FILES`     | **move** or **rename** files, repository, ... |
| :construction:             | `:construction:`             | `WIP`              | **WIP** work in progress commiting |

## Examples

Structure:

``` bash
git commit -m "EMOJI_CODE COMMIT-TYPE(optional-scope): SUBJECT"
git commit -m "💄 STYLE!: modify home and demo pages"
git commit -m "📚 DOCS(readme): update source code documentation"
```

Example with body and footer:

`git commit`

``` bash
:books: DOCS: update commits agreement code documentation

Test body message...
Body can contain multiple lines

BREAKING CHANGE: Test footer message...
Footer can contain multiple lines
```

Messages:

:lipstick: STYLE!: modify home and demo pages

:books: DOCS(readme): update source code documentation

:books: DOCS: update commits agreement code documentation


