# Project Outline

## Domain

#### Models and schema
  
MVP - render a playable puzzle
* Use an implementation of the [ipuz](http://www.ipuz.org/) puzzle format 

```json
{
  "version": "http://ipuz.org/v2",
  "kind": [ "http://ipuz.org/crossword#1" ],
  "dimensions": { "_Dimension_": n, ... },
  "puzzle": [ [ LabeledCell, ... ], ... ],
  "solution": [ [ CrosswordValue, ... ], ... ],
  "clues": { "Across": [ Clue, ... ], "Down": [ Clue, ... ] }
}
```

Additional Feature 1 (Puzzle upload)
* no additional models - file upload/parser to convert to ipuz format

Additional Feature 2 (Basic user functionality)
* User [username]
	* has many Puzzles [info needed for statistics: timer, completion percentage, saved game data]

Additional Features 3 (Co-op play)
* Room belongs to user1 and user2 and puzzle
	* Player creates a room which includes a puzzle and shares a link to join the room

## User Stories

MVP:
* As a user, I will be able to play a pre-loaded crossword puzzle
	* User can navigate the puzzle by clicking squares, clicking clue list, or with keyboard
	* User can check puzzle answer

Additional Feature 1 (Puzzle upload)
* As a user, I will be able to play a puzzle of my choice
	* I will be able to import puzzles from other crossword platforms in .ipuz or .puz formats

Additional Feature 2 (Basic user functionality)
* As a user, I will be able to login
	* After logging in, I will be able to save puzzles to my profile
	* I will be able to save my progress during a puzzle
	* I will be able to view a list of my saved puzzles
	* I will be able to resume playing saved puzzles
	* I will be able to view my statistics for played puzzles
	
Additional Features 3 (Co-op play)
* As a user, I will be able to play a puzzle in real time with another user
	* I will be able to share a link to play a game
	* Both users will be able to interact with the puzzle and see the other user's interactions
	
## Wire-Frames
https://drive.google.com/file/d/1g_4yu6FjvJO7eAfXeuTAbP4cUo3XK_Kw/view?usp=sharing
	
## Outside Resources
* A puzzle example in .ipuz format: [puzzle](http://www.ipuz.org/example)
* Reference to .puz file format spec: [docs](https://code.google.com/archive/p/puz/wikis/FileFormat.wiki)

## Project Schedule
* MVP: Friday 1/11
* Additional Feature 1: Monday 1/14
* Additional Feature 2: Thursday 1/17
* Additional Feature 3: Tuesday 1/22
* Final cleanup and CSS: Thursday 1/24