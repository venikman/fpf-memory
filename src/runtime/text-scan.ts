export interface TokenPosition {
  pos: number;
  len: number;
}

export function isWhitespaceCharacter(character: string | undefined): boolean {
  return character !== undefined && character.trim() === '';
}

export function skipWhitespace(text: string, startIndex: number): number {
  let index = startIndex;
  while (index < text.length && isWhitespaceCharacter(text[index])) {
    index += 1;
  }
  return index;
}

export function isUppercaseAsciiLetter(character: string | undefined): boolean {
  return character !== undefined && character >= 'A' && character <= 'Z';
}

export function isAsciiDigit(character: string | undefined): boolean {
  return character !== undefined && character >= '0' && character <= '9';
}

export function isAsciiAlphaNumeric(character: string | undefined): boolean {
  return (
    character !== undefined &&
    ((character >= 'A' && character <= 'Z') ||
      (character >= 'a' && character <= 'z') ||
      (character >= '0' && character <= '9'))
  );
}

export function toLowerAscii(character: string | undefined): string | undefined {
  return character !== undefined && character >= 'A' && character <= 'Z'
    ? character.toLowerCase()
    : character;
}

export function startsWithAsciiIgnoreCase(
  text: string,
  search: string,
  startIndex: number,
): boolean {
  if (startIndex < 0 || startIndex + search.length > text.length) {
    return false;
  }

  for (let index = 0; index < search.length; index += 1) {
    if (toLowerAscii(text[startIndex + index]) !== search[index]) {
      return false;
    }
  }
  return true;
}

export function findCollapsedTokenPosition(
  text: string,
  token: string,
): TokenPosition | undefined {
  for (let start = 0; start < text.length; start += 1) {
    if (toLowerAscii(text[start]) !== token[0]) {
      continue;
    }

    let cursor = start + 1;
    let tokenIndex = 1;
    while (tokenIndex < token.length) {
      while (cursor < text.length && !isAsciiAlphaNumeric(text[cursor])) {
        cursor += 1;
      }
      if (cursor >= text.length || toLowerAscii(text[cursor]) !== token[tokenIndex]) {
        tokenIndex = -1;
        break;
      }
      cursor += 1;
      tokenIndex += 1;
    }

    if (tokenIndex === token.length) {
      return { pos: start, len: cursor - start };
    }
  }

  return undefined;
}

export function findTokenPosition(
  text: string,
  token: string,
): TokenPosition | undefined {
  for (let start = 0; start <= text.length - token.length; start += 1) {
    if (startsWithAsciiIgnoreCase(text, token, start)) {
      return { pos: start, len: token.length };
    }
  }

  if (token.length > 0) {
    return findCollapsedTokenPosition(text, token);
  }

  return undefined;
}

export function collapseWhitespace(text: string): string {
  let result = '';
  let sawWhitespace = false;

  for (const character of text) {
    if (isWhitespaceCharacter(character)) {
      sawWhitespace = result.length > 0;
      continue;
    }
    if (sawWhitespace) {
      result += ' ';
      sawWhitespace = false;
    }
    result += character;
  }

  return result.trim();
}
