import BufferReader from "../BufferReader";

// reference: https://code.google.com/archive/p/puz/wikis/FileFormat.wiki
class PuzReader {
  constructor(data) {
    const puzzleBuffer = new BufferReader(data);

    this.header = {};

    // Checksum | 0x00 | 0x01 | 0x2 | short | overall file checksum
    this.header.checksum = puzzleBuffer.readShort();

    // File Magic | 0x02 | 0x0D | 0xC | string | NUL-terminated constant string: 4143 524f 5353 2644 4f57 4e00 ("ACROSS&DOWN")
    this.header.fileMagic = puzzleBuffer.readString();

    // CIB Checksum | 0x0E | 0x0F | 0x2 | short | (defined later)
    this.header.cibChecksum = puzzleBuffer.readShort();

    // Masked Low Checksums | 0x10 | 0x13 | 0x4 | | A set of checksums, XOR-masked against a magic string.
    this.header.maskedLowChecksums = puzzleBuffer.readInt();

    // Masked High Checksums | 0x14 | 0x17 | 0x4 | | A set of checksums, XOR-masked against a magic string.
    this.header.maskedHighChecksums = puzzleBuffer.readInt();

    // Version String(?) | 0x18 | 0x1B | 0x4 | string | e.g. "1.2\0"
    this.header.versionString = puzzleBuffer.readString();

    // Reserved1C(?) | 0x1C | 0x1D | 0x2 | ? | In many files, this is uninitialized memory
    this.header.reserved1C = puzzleBuffer.readTo(0x2);

    // Scrambled Checksum | 0x1E | 0x1F | 0x2 | short | In scrambled puzzles, a checksum of the real solution (details below). Otherwise, 0x0000.
    this.header.scrambledChecksum = puzzleBuffer.readShort();

    // Reserved20(?) | 0x20 | 0x2B | 0xC | ? | In files where Reserved1C is garbage, this is garbage too.
    this.header.reserver20 = puzzleBuffer.readTo(0xc);

    // Width | 0x2C | 0x2C | 0x1 | byte | The width of the board
    this.header.width = puzzleBuffer.readByte();

    // Height | 0x2D | 0x2D | 0x1 | byte | The height of the board
    this.header.height = puzzleBuffer.readByte();

    // # of Clues | 0x2E | 0x2F | 0x2 | short | The number of clues for this board
    this.header.numberOfClues = puzzleBuffer.readShort();

    // Unknown Bitmask | 0x30 | 0x31 | 0x2 | short | A bitmask. Operations unknown.
    this.header.unknownBitmask = puzzleBuffer.readShort();

    // Scrambled Tag | 0x32 | 0x33 | 0x2 | short | 0 for unscrambled puzzles. Nonzero (often 4) for scrambled puzzles.
    this.header.scrambledTag = puzzleBuffer.readShort();

    // end of header, beginning of dynamic values
    const HEADER_END = 0x34;
    puzzleBuffer.seekTo(HEADER_END);

    // solution
    // At the end of the header (offset 0x34) comes the solution to the puzzle.
    // Non-playable (ie: black) cells are denoted by '.'.

    // dynamic values based on grid size
    const gridSize = this.header.height * this.header.width;
    let buffer = puzzleBuffer.readTo(gridSize);
    this.solution = puzzleBuffer.toString(buffer);

    // state
    // Next comes the player state, stored similarly.
    // Empty cells are stored as '-'.
    buffer = puzzleBuffer.readTo(gridSize);
    this.state = puzzleBuffer.toString(buffer);

    // Immediately following the boards comes the strings.
    // All strings are encoded in ISO-8859-1 and end with a NUL.
    // Even if a string is empty, its trailing NUL still appears in the file.
    this.title = puzzleBuffer.readString();
    this.author = puzzleBuffer.readString();
    this.copyright = puzzleBuffer.readString();

    // there is one clue string for each clue as indicated by numberOfClues in header
    this.clues = [];
    while (this.clues.length < this.header.numberOfClues) {
      this.clues.push(puzzleBuffer.readString());
    }

    // one final notes string following all clues
    this.notes = puzzleBuffer.readString();

    // Extra Sections
    // Title | 0x04 | The name of the section, these are given in the previous table
    // Length | 0x02 | The length of the data section, in bytes, not counting the null terminator
    // Checksum | 0x02 | A checksum of the data section, using the same algorithm described above
    // Data | variable | The data, which varies in format but is always terminated by null and has the specified length
    this.extraSections = {};

    while (puzzleBuffer.data.length > puzzleBuffer.position) {
      let extraSection = {};
      let buffer = puzzleBuffer.readTo(0x4);
      let title = puzzleBuffer.toString(buffer);
      extraSection.length = puzzleBuffer.readShort();
      extraSection.checksum = puzzleBuffer.readShort();

      // check title to see how to handle data
      switch (title) {
        // The GRBS data is a "board" of one byte per square, similar to the strings for the solution and user state tables except that black squares, letters, etc. are not indicated. The byte for each square of this board indicates whether or not that square is a rebus. Possible values are:
        // 0 indicates a non-rebus square.
        // 1+n indicates a rebus square, the solution for which is given by the entry with key n in the RTBL section.
        // If a square is a rebus, only the first letter will be given by the solution board and only the first letter of any fill will be given in the user state board.
        case "GRBS":
          extraSection.data = [];
          for (let i = 0; i < extraSection.length; i++) {
            let rebusNumber = puzzleBuffer.readByte();
            extraSection.data.push(rebusNumber);
          }
          break;
        // The RTBL data is a string containing the solutions for any rebus squares.
        // These solutions are given as an ascii string. For each rebus there is a number, a colon, a string and a semicolon. The number (represented by an ascii string) is always two characters long - if it is only one digit, the first character is a space. It is the key that the GRBS section uses to refer to this entry (it is one less than the number that appears in the corresponding rebus grid squares). The string is the rebus solution.
        // For example, in a puzzle which had four rebus squares containing "HEART", "DIAMOND", "CLUB", and "SPADE", the string might be:
        // " 0:HEART; 1:DIAMOND;17:CLUB;23:SPADE;"
        // Note that the keys need not be consecutive numbers, but in official puzzles they always seem to be in ascending order. An individual key may appear multiple times in the GRBS board if there are multiple rebus squares with the same solution.
        case "RTBL":
          extraSection.data = puzzleBuffer.readString();
          break;

        // The LTIM data section stores two pieces of information: how much time the solver has used and whether the timer is running or stopped. The two pieces are both stored as ascii strings of numbers, separated by a comma. First comes the number of seconds elapsed, then "0" if the timer is running and "1" if it is stopped. For example, if the timer were stopped at 42 seconds when the puzzle was saved, the LTIM data section would contain the ascii string:
        // "42,1"
        case "LTIM":
          extraSection.data = puzzleBuffer.readString();
          break;
        //The GEXT data section is another "board" of one byte per square. Each byte is a bitmask indicating that some style attributes are set. The meanings of four bits are known:
        // 0x10 means that the square was previously marked incorrect
        // 0x20 means that the square is currently marked incorrect
        // 0x40 means that the contents were given
        // 0x80 means that the square is circled.
        // None, some, or all of these bits may be set for each square. It is possible that they have reserved other values.
        case "GEXT":
          extraSection.data = [];
          for (let i = 0; i < extraSection.length; i++) {
            let rebusNumber = puzzleBuffer.readByte();
            extraSection.data.push(rebusNumber);
          }
          break;
        default:
          extraSection.data = puzzleBuffer.readTo(extraSection.length);
          break;
      }
      this.extraSections[title] = extraSection;

      // each extra section ends with a null terminator
      // move to next null terminator
      let nextPosition = puzzleBuffer.data
        .slice(puzzleBuffer.position)
        .findIndex(c => c !== 0x00);
      if (nextPosition > 0) {
        puzzleBuffer.position += nextPosition;
      }
    }
  }
}

export default PuzReader;
