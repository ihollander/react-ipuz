import { EmojiConvertor } from "emoji-js";

const emojiConverter = new EmojiConvertor();

emojiConverter.init_env(); // else auto-detection will trigger when we first convert
emojiConverter.replace_mode = 'unified';
emojiConverter.allow_native = true;

emojiConverter.img_sets.apple.sheet = 'https://cdnjs.cloudflare.com/ajax/libs/wdt-emoji-bundle/0.2.1/sheets/sheet_apple_64_indexed_128.png';

emojiConverter.use_sheet = true;

export default emojiConverter